


/** require object and method -- crispy.init */
window.crispy=window.crispy||{
  version:'1.0.1',
  uri:'https://github.com/9r3i/fw-theme-crispy',
  init:async function(){
    if(!ForceWebsite.config.hasOwnProperty('crispy')){
      await Crispy.before();
    }
    ForceWebsite.theme.putHTML(ForceWebsite.theme.content);
    var files=[
      "js/jquery.min.js",
      "js/bootstrap.bundle.min.js",
    ];
    ForceWebsite.theme.loadFiles(files);
    setTimeout(e=>{
      if(typeof jQuery!=='undefined'){
        jQuery('.navbar-nav .nav-link').click(function(){
          jQuery(".navbar-collapse").collapse('hide');
        });
      }
    },(100*files.length)+300);
  },
  products:[],
};

/**
 * Crispy Object
 * ~ a theme helper for Force Website
 * authored by 9r3i
 * https://github.com/9r3i
 * started at december 3rd 2022
 * @requires:
 *   Force - https://github.com/9r3i/force
 *   ForceWebsite - https://github.com/9r3i/force-website
 */
window.Crispy=window.Crispy||{
  /* this method must be loaded before theme loaded */
  before:async function(){
    var cdata=await ForceWebsite.Force.fetch('crispy.get',{
      database:ForceWebsite.config.data.base,
    },{
      method:'GET',
    }),
    jdata=await ForceWebsite.Force.fetch('website.select',{
      database:ForceWebsite.config.data.base,
      key: 'type',
      type: 'json',
    },{
      method:'GET',
    }),
    jpost=false,
    res=false;
    try{
      res=JSON.parse(cdata);
      jpost=JSON.parse(jdata);
    }catch(e){
      
    }
    if(res&&!ForceWebsite.config.hasOwnProperty('crispy')){
      ForceWebsite.config.crispy=res;
    }
  },
  args:{
    all: true,
  },
  months:[
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ],
  aboutContent:function(){
    var id='about-content',
    idt='about-title',
    image=ForceWebsite.theme.path+'images/default.loader.gif',
    mainID='crispy-page-loader',
    contentMain='<div class="'+mainID+'" id="'+mainID+'">'
      +'<img src="'+image+'" /> Loading...'
      +'</div>',
    rescon='<div id="'+id+'">'+contentMain+'</div>';
    if(typeof ForceWebsite.aboutContent==='string'){
      setTimeout(e=>{
        var el=document.getElementById(id);
        el.parentNode.innerHTML=ForceWebsite.aboutContent;
        var elt=document.getElementById(idt);
        elt.innerHTML=ForceWebsite.aboutTitle;
        Crispy.formSubmitInit();
      },100);
      return rescon;
    }
    ForceWebsite.fetch('website.select',r=>{
      if(!Array.isArray(r)){
        return ForceWebsite.Force.splash(r.toString());
      }
      ForceWebsite.aboutContent=r[0].content;
      ForceWebsite.aboutTitle=r[0].title;
      var el=document.getElementById(id);
      el.parentNode.innerHTML=ForceWebsite.aboutContent;
      var elt=document.getElementById(idt);
      elt.innerHTML=ForceWebsite.aboutTitle;
      Crispy.formSubmitInit();
    },{
      key: 'id',
      id: ForceWebsite.config.crispy.about.id,
    });
    return rescon;
  },
  teamPosts:function(){
    var id='news-items',
    header='<div class="col-12"><h2 class="mb-lg-5 mb-4">'
      +ForceWebsite.config.crispy.about.team.title
      +'</h2></div>',
    image=ForceWebsite.theme.path+'images/default.loader.gif',
    mainID='crispy-page-loader',
    contentMain='<div class="'+mainID+'" id="'+mainID+'">'
      +'<img src="'+image+'" /> Loading...'
      +'</div>',
    rescon='<div id="'+id+'">'+contentMain+'</div>';
    if(typeof ForceWebsite.teamItems==='string'){
      setTimeout(e=>{
        var el=document.getElementById(id);
        el.parentNode.innerHTML=header+ForceWebsite.teamItems;
      },100);
      return rescon;
    }
    ForceWebsite.fetch('website.select',r=>{
      if(!Array.isArray(r)){
        return ForceWebsite.Force.splash(r.toString());
      }
      var res=[],
      i=r.length;
      while(i--){
        var p=r[i],
        jd=JSON.parse(p.content);
        if(jd.type=='team'){
          jd.title=p.title;
          jd.picture=ForceWebsite.imageURL(p.id);
          var sme=Crispy.teamEach(jd);
          res.push(sme);
        }
      }
      res.reverse();
      ForceWebsite.teamItems=res.join('\n');
      var el=document.getElementById(id);
      el.parentNode.innerHTML=header+ForceWebsite.teamItems;
    },{
      key: 'type',
      type: 'json',
    });
    return rescon;
  },
  teamEach:function(item){
    if(typeof item!=='object'||item===null
      ||Array.isArray(item)){return '';}
    var col='<div class="col-lg-4 col-12">'
      +'<div class="team-thumb"><img src="'
      +item.picture
      +'" class="img-fluid team-image" alt="">'
      +'<div class="team-info">'
      +'<h4 class="mt-3 mb-0">'+item.title+'</h4>'
      +'<p>'+item.occupation+'</p>'
      +'</div></div></div>';
    return col;
  },
  newsPosts:function(){
    var id='news-items',
    header='<div class="col-12"><h2 class="mb-lg-5 mb-4">'
      +ForceWebsite.config.crispy.bulk.title
      +'</h2></div>',
    image=ForceWebsite.theme.path+'images/default.loader.gif',
    mainID='crispy-page-loader',
    contentMain='<div class="'+mainID+'" id="'+mainID+'">'
      +'<img src="'+image+'" /> Loading...'
      +'</div>',
    rescon='<div id="'+id+'">'+contentMain+'</div>';
    if(typeof ForceWebsite.newsItems==='string'){
      setTimeout(e=>{
        var el=document.getElementById(id);
        el.parentNode.innerHTML=header+ForceWebsite.newsItems;
        ForceWebsite.finishing();
      },100);
      return rescon;
    }
    ForceWebsite.fetch('website.select',r=>{
      if(!Array.isArray(r)){
        return ForceWebsite.Force.splash(r.toString());
      }
      var res=[],
      i=r.length;
      while(i--){
        var p=r[i],
        jd=JSON.parse(p.content);
        if(jd.type=='event'||jd.type=='news'){
          jd.slug=p.slug;
          jd.title=p.title;
          jd.picture=ForceWebsite.imageURL(p.id);
          var sme=Crispy.newsEach(jd);
          res.push(sme);
        }
        if(res.length>=ForceWebsite.config.crispy.bulk.limit){
          break;
        }
      }
      ForceWebsite.newsItems=res.join('\n');
      var el=document.getElementById(id);
      el.parentNode.innerHTML=header+ForceWebsite.newsItems;
      ForceWebsite.finishing();
    },{
      key: 'type',
      type: 'json',
    });
    return rescon;
  },
  newsEach:function(item){
    if(typeof item!=='object'||item===null
      ||Array.isArray(item)){return '';}
    var dt=new Date(item.date),
    dte=[
      dt.getDate(),
      Crispy.months[dt.getMonth()],
      dt.getFullYear(),
    ],
    col='<div class="col-lg-4 col-md-6 col-12">'
        +'<div class="news-thumb mb-4">'
        +'<a href="?p='+item.slug+'">'
        +'<img src="'+item.picture
        +'" class="img-fluid news-image" alt="">'
        +'</a>'
        +'<div class="news-text-info">'
        +'<span class="category-tag me-3 bg-info">'
        +item.tag+'</span>'
        +'<strong>'+dte.join(' ')+'</strong>'
        +'<h5 class="news-title mt-2">'
        +'<a href="?p='+item.slug+'" class="news-title-link">'
        +item.title
        +'</a></h5></div></div></div>';
    return col;
  },
  heroVideo:function(){
    var id=ForceWebsite.config.crispy.hero.video;
    return ForceWebsite.contentURL(id);
  },
  postContent:function(post){
    var url=ForceWebsite.contentURL(post.id),
    dls=['gzip','binary'];
    if(post.type=='text'){
      return post.content;
    }else if(post.type=='image'){
      return '<img src="'+url+'" class="img-fluid news-detail-image" alt="" />';
    }else if(post.type=='audio'){
      return '<audio src="'+url+'" controls style="width:100%;"></audio>';
    }else if(post.type=='video'){
      return '<video src="'+url+'" controls style="width:100%;"></video>';
    }else if(dls.indexOf(post.type)>=0){
      return '<button type="button" class="custom-btn btn btn-info btn-lg" data-url="'+url+'" onclick="Crispy.download(this)">Download</button>';
    }else if(post.type=='json'){
      var jdata=JSON.parse(post.content);
      if(jdata.type=='product'&&jdata.mode=='special'){
        jdata.title=post.title;
        jdata.picture=ForceWebsite.imageURL(post.id);
        return Crispy.specialMenus([jdata]);
      }else if(jdata.type=='news'||jdata.type=='event'){
        if(jdata.hasOwnProperty('content')){
          return jdata.content;
        }
      }
    }
    return '<button type="button" class="custom-btn btn btn-info btn-lg" data-url="'+url+'" onclick="Crispy.download(this)">Download ('+post.type+')</button>';
  },
  postImage:function(id){
    if(ForceWebsite.theme.data.post.type=='json'){
      var jdata=JSON.parse(ForceWebsite.theme.data.post.content);
      if(jdata.type=='product'&&jdata.mode=='special'){
        return '';
      }
    }
    var imageURL=ForceWebsite.imageURL(id);
    return '<img src="'+imageURL+'" class="img-fluid news-detail-image" alt="">';
  },
  postImageURL:function(id){
    return ForceWebsite.imageURL(id);
  },
  download:function(el){
    return window.open(el.dataset.url,'_blank');
  },
  bulkContent:function(bulk,all){
    bulk=typeof bulk==='object'&&bulk!==null?bulk:{};
    var res=[],rcount=0;
    for(var slug in bulk){
      if(bulk[slug].type!='text'){
        continue;
      }
      var post=bulk[slug],
      col='<div class="col-lg-6 col-md-6 col-12">'
        +'<div class="news-thumb mb-4">'
        +'<a href="?p='+slug+'">'
        +'<img src="'+ForceWebsite.imageURL(post.id)
          +'" class="img-fluid news-image" alt="'
          +post.title+'" onerror="this.onerror=null;this.src=\''
          +ForceWebsite.theme.path
          +'images/default.failed.png\'" />'
        +'</a>'
        +'<div class="news-text-info news-text-info-large">'
        +'<span class="category-tag bg-danger">Featured</span>'
        +'<h5 class="news-title mt-2">'
        +'<a href="?p='+slug+'" class="news-title-link">'
          +post.title+'</a>'
        +'</h5>'
        +'</div></div></div>';
      res.push(col);
      rcount++;
      if(rcount>=ForceWebsite.config.crispy.bulk.limit&&!all){
        break;
      }
    }return res.join('\n');
  },
  sliderItems:function(){
    var id='carousel-slider-items',
    rescon='';
    if(typeof ForceWebsite.sliderItems==='string'){
      setTimeout(e=>{
        var el=document.getElementById(id);
        el.innerHTML=ForceWebsite.sliderItems;
      },100);
      return rescon;
    }
    ForceWebsite.fetch('website.select',r=>{
      if(!Array.isArray(r)){
        return ForceWebsite.Force.splash(r.toString());
      }
      var res=[],
      i=r.length,
      el=document.getElementById(id);
      while(i--){
        var p=r[i],
        jd=JSON.parse(p.content);
        if(jd.type=='product'&&jd.mode=='slider'){
          jd.title=p.title;
          jd.picture=ForceWebsite.imageURL(p.id);
          var sme=Crispy.sliderEach(jd);
          res.push(sme);
        }
        if(res.length>=6){
          break;
        }
      }
      ForceWebsite.sliderItems=res.join('\n');
      el.innerHTML=ForceWebsite.sliderItems;
    },{
      key: 'type',
      type: 'json',
    });
    return rescon;
  },
  sliderEach:function(item,path,obj){
    if(typeof item!=='object'||item===null
      ||Array.isArray(item)){return '';}
    path=typeof path==='string'?path:'';
      var caption='';
      if(item.hasOwnProperty('location')){
        caption='<span class="text-white">'
          +'<i class="bi-geo-alt me-2"></i>'
          +item.location+'</span>'
          +'<h4 class="hero-text">'+item.title+'</h4>';
      }else{
        caption='<div class="d-flex align-items-center">'
          +'<h4 class="hero-text">'+item.title+'</h4>'
          +'<span class="price-tag ms-4"><small>'
            +item.currency+'</small>'+item.price+'</span>'
          +'</div>'
          +'<div class="d-flex flex-wrap align-items-center">'
          +'<h5 class="reviews-text mb-0 me-3">'
            +item.rate+'/'+item.rateMax+'</h5>'
          +'<div class="reviews-stars">'
          +Crispy.rateStars(item.rate,item.rateMax)
          +'</div>'
          +'</div>';
      }
      var active=item.active?'active':'',
      cel=ForceWebsite.buildElement('div',null,{
        'class':'carousel-item '+active,
      }),
      cal='<div class="carousel-image-wrap">'
        +'<img src="'+path+item.picture+'" class="img-fluid carousel-image" alt="'+item.title+'">'
        +'</div>'
        +'<div class="carousel-caption">'
        +caption+'</div>',
      col='<div class="carousel-item '+active+'">'
        +cal+'</div>';
      cel.innerHTML=cal;
    return obj?cel:col;
  },
  carouselItems:function(items,path){
    items=Array.isArray(items)?items:[];
    path=typeof path==='string'?path:'';
    var res=[];
    for(var item of items){
      var col=Crispy.sliderEach(item,path);
      res.push(col);
    }return res.join('\n');
  },
  numberFormat:function(number,locale){
    number=number?parseInt(number,10):0;
    locale=typeof locale==='string'?locale:'id-ID';
    return new Intl.NumberFormat(locale,{
      
    }).format(number);
  },
  specialMenusCategorized:function(){
    var id='content',
    image=ForceWebsite.theme.path+'images/default.loader.gif',
    mainID='crispy-page-loader',
    contentMain='<div class="'+mainID+'" id="'+mainID+'">'
      +'<img src="'+image+'" /> Loading...'
      +'</div>',
    rescon='<div id="'+id+'">'+contentMain+'</div>';
    if(typeof ForceWebsite.specialCategorized==='string'){
      setTimeout(e=>{
        var el=document.getElementById(id);
        el.innerHTML=ForceWebsite.specialCategorized;
      },100);
      return rescon;
    }
    ForceWebsite.fetch('website.select',r=>{
      if(!Array.isArray(r)){
        return ForceWebsite.Force.splash(r.toString());
      }
      var res=[],
      ros={},
      rc=0,
      i=r.length;
      while(i--){
        var p=r[i],
        jd=JSON.parse(p.content);
        if(jd.type=='product'&&jd.mode=='special'){
          jd.title=p.title;
          jd.picture=ForceWebsite.imageURL(p.id);
          var sme=Crispy.specialMenuEach(jd);
          if(!ros.hasOwnProperty(jd.category)){
            ros[jd.category]=[];
            var jhead='<div class="col-12"><h2 class="mb-lg-5 mb-4">'+jd.category+'</h2></div>';
            ros[jd.category].push(jhead);
          }ros[jd.category].push(sme);
        }
      }
      for(var jc in ros){
        res.push(
          '<section class="menu section-padding'
          +(rc%2?' bg-white':'')+'">'
          +'<div class="container"><div class="row">'
          +ros[jc].join('\n')
          +'</div></div></section>'
        );
        rc++;
      }
      ForceWebsite.specialCategorized=res.join('\n');
      var el=document.getElementById(id);
      el.innerHTML=ForceWebsite.specialCategorized;
    },{
      key: 'type',
      type: 'json',
    });
    return rescon;
  },
  specialMenusPosts:function(){
    var id='special-items',
    header='<div class="col-12">'
      +'<h2 class="text-center mb-lg-5 mb-4">'
      +ForceWebsite.config.crispy.special.title
      +'</h2></div>',
    image=ForceWebsite.theme.path+'images/default.loader.gif',
    mainID='crispy-page-loader',
    contentMain='<div class="'+mainID+'" id="'+mainID+'">'
      +'<img src="'+image+'" /> Loading...'
      +'</div>',
    rescon='<div id="'+id+'">'+contentMain+'</div>';
    if(typeof ForceWebsite.specialItems==='string'){
      setTimeout(e=>{
        var el=document.getElementById(id);
        el.parentNode.innerHTML=header+ForceWebsite.specialItems;
      },100);
      return rescon;
    }
    ForceWebsite.fetch('website.select',r=>{
      if(!Array.isArray(r)){
        return ForceWebsite.Force.splash(r.toString());
      }
      var res=[],
      i=r.length;
      while(i--){
        var p=r[i],
        jd=JSON.parse(p.content);
        if(jd.type=='product'&&jd.mode=='special'){
          jd.title=p.title;
          jd.picture=ForceWebsite.imageURL(p.id);
          var sme=Crispy.specialMenuEach(jd);
          res.push(sme);
        }
        if(res.length>=6){
          break;
        }
      }
      ForceWebsite.specialItems=res.join('\n');
      var el=document.getElementById(id);
      el.parentNode.innerHTML=header+ForceWebsite.specialItems;
    },{
      key: 'type',
      type: 'json',
    });
    return rescon;
  },
  specialMenuEach:function(men,path){
    if(typeof men!=='object'||men===null
      ||Array.isArray(men)){return '';}
    path=typeof path==='string'?path:'';
      var pori=men.hasOwnProperty('priceOrigin')
        &&men.priceOrigin!=men.price
        ?'<del class="ms-4"><small>'+men.currency
          +'</small>'+men.priceOrigin+'</del>':'',
      col='<div class="col-lg-4 col-md-6 col-12">'
        +'<div class="menu-thumb">'
        +'<div class="menu-image-wrap">'
        +'<img src="'+path+men.picture+'" '
          +'class="img-fluid menu-image" '
          +'alt="'+men.title+'">'
        +'<span class="menu-tag bg-warning">'+men.tag+'</span></div>'
        +'<div class="menu-info d-flex flex-wrap align-items-center">'
        +'<h4 class="mb-0">'+men.title+'</h4>'
        +'<span class="price-tag bg-white shadow-lg ms-4">'
        +'<small>'+men.currency+'</small>'+men.price+'</span>'
        +pori
        +'<div class="d-flex flex-wrap align-items-center w-100 mt-2">'
        +'<h6 class="reviews-text mb-0 me-3">'+men.rate
          +'/'+men.rateMax+'</h6>'
        +'<div class="reviews-stars">'
        +Crispy.rateStars(men.rate,men.rateMax)
        +'</div>'
        +'<p class="reviews-text mb-0 ms-4">'+men.reviews
          +' Reviews</p>'
        +'</div></div></div></div>';
    return col;
  },
  specialMenus:function(menus,path){
    menus=Array.isArray(menus)?menus:[];
    path=typeof path==='string'?path:'';
    var res=[];
    for(var men of menus){
      col=Crispy.specialMenuEach(men,path);
      res.push(col);
    }return res.join('\n');
  },
  rateStars:function(rate,max){
    rate=rate?parseInt(rate):0;
    max=max?parseInt(max):5;
    var res=[];
    for(var i=0;i<max;i++){
      var sc=i>=rate?'bi-star':'bi-star-fill';
      res.push('<i class="'+sc+' reviews-icon"></i>');
    }return res.join('\n');
  },
  socialMedia:function(medias){
    media=typeof medias==='object'&&medias!==null?medias:{};
    var res=[];
    for(var med in medias){
      var medc='<li><a href="'+medias[med]+'" target="_blank" '
        +'class="social-icon-link bi-'+med+'"></a></li>';
      res.push(medc);
    }return res.join('\n');
  },
  mainContent:function(query,post,bulk){
    var file='html/index.html',
    image=ForceWebsite.theme.path+'images/default.loader.gif',
    mainID='crispy-page-loader',
    contentMain='<div class="'+mainID+'" id="'+mainID+'">'
      +'<img src="'+image+'" /> Loading...'
      +'</div>';
    if(query.hasOwnProperty('p')){
      file='html/post.html';
    }else if(query.hasOwnProperty('contact')){
      file='html/contact.html';
    }else if(query.hasOwnProperty('news')){
      file='html/news.html';
    }else if(query.hasOwnProperty('special')){
      file='html/special.html';
    }else if(query.hasOwnProperty('about')){
      file='html/about.html';
    }
    ForceWebsite.theme.loadHTML(file,r=>{
      var forms=document.querySelectorAll('form'),
      mainTag=document.getElementById(mainID).parentNode;
      mainTag.innerHTML=r;
      for(var form of forms){
        form.onsubmit=Crispy.formSubmit;
      }
      /**/
      setTimeout(e=>{
        document.body.scroll(0,0);
        document.body.scroll({
          top: 0,
          left: 0,
          behavior:'smooth',
        });
        Crispy.formSubmitInit();
      },500);
      //*/
    });
    return contentMain;
  },
  navMenu:function(menus){
    menus=Array.isArray(menus)?menus:[];
    var res=[],
    pkey=localStorage.getItem('website-pkey');
    for(var m of menus){
      var tx=m.text.match(/^(login|admin|kitchen)/i)
        &&typeof pkey==='string'
        ?'Kitchen':m.text,
      tac=ForceWebsite.query.hasOwnProperty(m.href.substr(1))
        ?' active':'',
      tm='<li class="nav-item">'
        +'<a class="nav-link'+tac+'" href="'
        +m.href+'" title="'+tx+'">'+tx+'</a></li>';
      res.push(tm);
    }return res.join('\n');
  },
  formSubmitInit:function(){
    var forms=document.querySelectorAll('form');
    if(forms){
      for(var form of forms){
        form.onsubmit=Crispy.formSubmit;
      }
    }
  },
  formSubmit:function(e){
    e.preventDefault();
    var formdata={};
    for(var tar of e.target){
      if(tar.name){
        formdata[tar.name]=tar.value;
      }
    }
    var mtd=formdata.hasOwnProperty('method')
      ?formdata.method:'crispy.unknown';
    ForceWebsite.request(mtd,r=>{
      alert(r.match(/^error/i)?r:'Sent.');
    },formdata);
    return false;
  },
};
