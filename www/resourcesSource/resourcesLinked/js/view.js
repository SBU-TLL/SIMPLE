/*
	Author:	Anthony John Ripa
	Date:	Winter 2017
	Code:	View (a view library)
*/

class v {

	static liimg(bean) { return this.li(this.img(bean)); }
	static divimage(bean) { return this.div(this.img(bean)); }
	static lis(beans) { return beans.map(bean=>this.li(bean)); }
	static liimgs(beans) { return beans.map(bean=>this.liimg(bean)); }
	static imgs(beans) { return beans.map(bean=>this.img(bean)); }
	static divs(beans) { return beans.map(bean=>this.div(bean)); }
	static li(bean) { return $('<li>', bean instanceof jQuery ? {html:bean} : bean); }
	static img(bean) { return bean instanceof jQuery ? bean : $('<img>',bean); }
	static imgrepeat(bean) { return this.repeater({...bean,html:this.img(bean)}); }
	static repeater(bean) { return Array(bean.count).fill(0).map(()=>bean.html.clone()); }
	static divimagerepeater(bean) { return this.repeater({...bean,html:this.divimage(bean)}); }
	static div(bean) { return $('<div>', bean instanceof jQuery || (Array.isArray(bean) && bean[0] instanceof jQuery) ? {html:bean} : bean); }
	static progress(bean) { return $('<progress>',bean); }

}

class viewdom {

	static render(dom, view) {
		$(dom).html(view);
	}

}
