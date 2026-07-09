# syntax=docker/dockerfile:1
###############################################################################
# Production image — SIMPLE (PSD-processing teaching tool)
#
# Tech stack : plain PHP (no framework/DB/Composer). index.php is a page router
#              (?p=home|online_examples|setting_up|simple_uploader|processor ->
#              pages/$p.php) + jQuery/CSS. pages/processor.php is a PSD upload
#              pipeline: reads $_SERVER['cn'] (Shibboleth netID) for the per-user
#              uploads/$cn folder, runs ImageMagick (/usr/bin/convert +
#              /usr/bin/identify) and `python3 ./quadJSONsmall.py` (needs numpy).
# Web server : Apache (php:8.3-apache) so the per-dir Shibboleth .htaccess guards
#              are honored.
#
# Runtime tools installed below: imagemagick (convert/identify) + python3 +
# python3-numpy (the pipeline shells out to both).
#
# Authentication: Shibboleth (cn), enforced at the ingress / reverse proxy
#   (Ansible-managed). The served subdirs' `<IfModule mod_shib>` guards are inert
#   without mod_shib (this image), so the proxy is the gate. The dev-only mock
#   lives under .ddev/ and is excluded. No secrets/DB baked in.
#
# EXTERNAL internal-project dependencies (NOT bundled — must be co-served at the
# same origin, or these degrade):
#   * /fonts/FuturaPT*.otf   (the internal "fonts" project) — css/style.css
#   * /login/js/lti.js       (the internal "login" project) — resourcesSource/
#   See .env.production.example.
#
# uploads/ is a symlink to ../userData/SIMPLE/uploads (outside the docroot); the
# target is created writable below and should be a mounted volume in production.
#
# Runs non-root (www-data) on unprivileged port 8080.
###############################################################################
FROM php:8.3-apache

# --- Runtime tools the PSD pipeline shells out to ---
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends imagemagick python3 python3-numpy; \
    rm -rf /var/lib/apt/lists/*; \
    # allow ImageMagick to read PSD (some policy.xml builds restrict coders)
    if [ -f /etc/ImageMagick-6/policy.xml ]; then \
      sed -ri 's!<policy domain="coder" rights="none" pattern="PSD" ?/>!<policy domain="coder" rights="read|write" pattern="PSD" />!' /etc/ImageMagick-6/policy.xml; \
    fi

# --- Apache modules the app's .htaccess uses ---
RUN set -eux; \
    a2enmod rewrite headers

# --- Run as a non-root user on an unprivileged port (8080) ---
RUN set -eux; \
    sed -ri 's/^Listen 80$/Listen 8080/' /etc/apache2/ports.conf; \
    sed -ri 's/:80>/:8080>/' /etc/apache2/sites-available/000-default.conf

# --- Security hardening (suppress server tokens/signature, TRACE, ETag) ---
RUN set -eux; \
    { \
      echo 'ServerTokens Prod'; \
      echo 'ServerSignature Off'; \
      echo 'TraceEnable Off'; \
      echo 'FileETag None'; \
    } > /etc/apache2/conf-available/zzz-hardening.conf; \
    a2enconf zzz-hardening

# --- Docroot policy: parse .htaccess (AllowOverride All) for DirectoryIndex +
#     Shibboleth guards; no dir listing; log to stdout/stderr ---
RUN set -eux; \
    { \
      echo '<Directory /var/www/html>'; \
      echo '    Options -Indexes +FollowSymLinks'; \
      echo '    AllowOverride All'; \
      echo '    Require all granted'; \
      echo '</Directory>'; \
      echo 'ErrorLog /dev/stderr'; \
      echo 'CustomLog /dev/stdout combined'; \
    } > /etc/apache2/conf-available/zzz-docroot.conf; \
    a2enconf zzz-docroot

# --- Application code. .dockerignore excludes .ddev/, .git/, .env*, Dockerfile,
#     the committed grades.csv (student PII!), backup/old dirs (resourcesSource_bak,
#     uploads_old, oldquad), *.bak, the build helpers (remakeJSON.sh/togglePY.sh),
#     the screenshot, gemini_debug.log, test.html, docs and OS junk. ---
COPY --chown=www-data:www-data . /var/www/html/

# --- Permissions: read-only app tree owned by www-data, plus the writable
#     uploads target (uploads/ symlinks to ../userData/SIMPLE/uploads, outside
#     the docroot). Mount a volume there in production for persistence. ---
RUN set -eux; \
    find /var/www/html -type d -exec chmod 0755 {} +; \
    find /var/www/html -type f -exec chmod 0644 {} +; \
    mkdir -p /var/www/userData/SIMPLE/uploads; \
    chown -R www-data:www-data /var/www/userData; \
    chmod -R 0775 /var/www/userData; \
    chown -R www-data:www-data /var/run/apache2 /var/log/apache2 /var/lock; \
    chmod -R g=u /var/run/apache2 /var/log/apache2 /var/lock

USER www-data
EXPOSE 8080
VOLUME ["/var/www/userData/SIMPLE/uploads"]

# php:apache base CMD = apache2-foreground
