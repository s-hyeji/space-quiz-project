//  new window.$cale({
//         target: document.getElementById("wrap"),
//         mode: ""
//     });
function size() {
    //전체화면 크기를 불러온다
    let wholeWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let wholeHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //줄어들어야되는 요소 크기를 불러온다
    let wrapWidth = document.querySelector("#wrap").clientWidth;
    let wrapHeight = document.querySelector("#wrap").clientHeight;
    //두개를 나눠서 비율을 뽑는다 -> transform scale
    let widthZoom = wholeWidth / wrapWidth;
    let heightZoom = wholeHeight / wrapHeight;
    //비율 크기 비교해서 작은값
    //높이 비율과 넓이비율중 작은값을 써야 화면에 맞춰서 줄어든다
    //줄어들어야 되는 요소에 인라인으로 부여한다(언제?) resize window.addEventListener('resize', this.reSet.bind(this, this.element));
    let zoomRate;
    if (widthZoom > heightZoom) {
        document.querySelector("#wrap").style.transform = `scale(${heightZoom})`
        zoomRate = heightZoom;
    } else {
        document.querySelector("#wrap").style.transform = `scale(${widthZoom})`
        zoomRate = widthZoom;
    }
    document.querySelector("#wrap").style.transformOrigin = '0% 0%';
    document.querySelector("#wrap").style.MsTransformOrigin = '0% 0%';
    document.querySelector("#wrap").style.MozTransformOrigin = '0% 0%';
    document.querySelector("#wrap").style.WebkitTransformOrigin = '0% 0%';
    // document.querySelector("#wrap").style.left = wholeWidth - (wrapWidth * zoomRate) > 0 ? wholeWidth - (wrapWidth * zoomRate) / 2 : 'auto'
    // console.log(document.querySelector('#wrap').style.transform.split('scale(')[1].split(')')[0])
    // // ctx.scale = document.querySelector('#wrap').style.transform.split('scale(')[1].split(')')[0]
    // var canvas = document.getElementById('myCanvas');
    // var context = canvas.getContext('2d');
    // context.scale = document.querySelector('#wrap').style.transform.split('scale(')[1].split(')')[0];
    if (window.$callBack && window.$callBack.sizez) window.$callBack.sizez();
}

window.onload = function () {
    size()
}
window.addEventListener('resize', function () {
    size()
})