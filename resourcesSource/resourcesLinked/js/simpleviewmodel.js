/*
	Author:	Anthony John Ripa
	Date:	Winter 2017
	Code:	SIMPLE Viewmodel (a Viewmodel for SIMPLE)
*/

class simplevm {
	static h0(me) { return {mouseenter:me.handlerIn.bind(me),mouseleave:me.handlerOut.bind(me)}; }
	static layerimgs(layers) { return layers.slice(1).map(this.layerimg); }
	static games() { return [this.gameind(),this.gametyp(),this.gamesel()]; }
	static imaps(me) { return me.layerInfo.imageMap.rects.map(e=>({...this.h(me),...this.imap(e)})); }
	static gameind() { return {html:'Start Index Card Mode',onclick:'IndexGame.getInstance().init()'} }
	static gametyp() { return {html:'Start Typing Game',onclick:'TypingGame.getInstance().init()'} }
	static gamesel() { return {html:'Start Selector Game',onclick:'SelectorGame.getInstance().init()'} }
	static objli(layer) { return {html:layer.lname,id:layer.id,'data-name':layer.lname,class:layer.id}; }
	static objlis(me) { return me.layerInfo.layers.slice(1).map(e=>({...this.h(me),...this.objli(e)})); }
	static check(right) { return {class:(right?'right':'wrong')}; }
	static checks(me) { return me.answers.filter(e=>e!='u').map((e,i)=>this.check(me.answers[i])); }
	static heart(me) { return {class:'heart',src:'resourcesLinked/images/system/Heart.svg',count:me.answers.reduce((s,e)=>s+e,0)}; }
	static leave(d) {
		return {id:'picture',usemap:'#nav',src:'resourcesLinked/images/system/1px.png',width:d.width+'%',height:d.height+'%'}
	}
	static imap(e) {
		return {style:`left:${e.l}%;top:${e.t}%;width:${Math.ceil(e.w)}%;height:${Math.ceil(e.w)}%`,class:e.i+" map",href:"#"};
	}
	static layerimg(layer) {
		return {src:`resourcesDynamic/images/layer-${layer.id}.png`,id:"image-"+layer.id,'data-name':layer.lname,class:layer.id};
	}
	static enter(d) {
		return {id:'picture',usemap:'#nav',src:`resourcesDynamic/images/layer-${d[0]}.png`,width:d[1].width+'%',height:d[1].height+'%'}
	}
	static h(me) {
		return {
			mouseenter:
				function() {
					var picNum = $(this).attr("class").split(" ")[0];
					$("#" + picNum).css('background-color','#4e2a7f');
					$("#picture").attr("src", `resourcesDynamic/images/layer-${picNum}.png`);
				},
			mouseleave: 
				function() {
					var picNum = $(this).attr("class").split(" ")[0];
					$("#" + picNum).css('background-color','#3a3a3a');
					$("#picture").attr("src", 'resourcesLinked/images/system/1px.png');
				}
		};
	}
}

