/*
	Author:	Anthony John Ripa
	Date:	Winter 2017
	Code:	SIMPLE View (Views for SIMPLE)
*/

class simplev {
	
	static overlay(d) {
		return v.div({
			id:'overlay',
			html:
				[
					v.div(
						{
							id:'overlayButton',
							html:v.img({src:'resourcesLinked/images/system/xmark.svg'}),
							click: () => {
								d[1].overlayDestroy();
								d[1].destroy();
								IndexGame.getInstance().init();
							}
						}
					),
					v.div({id:'overlayText',html:d[0]})
				]
		});
	}

}
