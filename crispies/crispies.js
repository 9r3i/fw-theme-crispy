/**
 * crispies.js
 * ~ a Force plugin for managing crispy theme
 * started at december 4th 2022
 * @requires ForceWebsite
 */
(async function(){
  //await (new crispies).before();
})();
;function crispies(param){
this.data=null;
this.init=function(plug){
  this.Force=plug.Force;
  
};
/* this method must be loaded before theme loaded */
this.before=async function(){
  var cdata=await ForceWebsite.Force.fetch('crispy.get',{
    database:ForceWebsite.config.data.base,
  },{
    method:'GET',
  }),
  res=false;
  try{
    res=JSON.parse(cdata);
  }catch(e){
    
  }
  if(res&&!ForceWebsite.config.hasOwnProperty('crispy')){
    ForceWebsite.config.crispy=res;
  }
};
/* kitchen */
this.kitchen=function(plug){
  this.Force=plug.Force;
  if(ForceWebsite.query.hasOwnProperty('page')){
    if(ForceWebsite.query.page=='config'){
      return this.kitchenConfig(plug);
    }else if(ForceWebsite.query.page=='inbox'){
      return this.kitchenInbox(plug);
    }else if(ForceWebsite.query.page=='order'){
      return this.kitchenOrder(plug);
    }else if(ForceWebsite.query.page=='slider'){
      return this.kitchenSlider(plug);
    }
  }
  var p='',
  _this=this,
  norder=ForceWebsite.buildElement('button',null,{
    'class':'button button-tosca',
  },[
    ForceWebsite.buildElement('i',null,{
      'class':'fa fa-paperclip',
    }),
    document.createTextNode('Order'),
  ]),
  ninbox=ForceWebsite.buildElement('button',null,{
    'class':'button button-soft-green',
  },[
    ForceWebsite.buildElement('i',null,{
      'class':'fa fa-envelope-o',
    }),
    document.createTextNode('Inbox'),
  ]),
  nslider=ForceWebsite.buildElement('button',null,{
    'class':'button button-green',
  },[
    ForceWebsite.buildElement('i',null,{
      'class':'fa fa-sliders',
    }),
    document.createTextNode('Slider'),
  ]),
  nconfig=ForceWebsite.buildElement('button',null,{
    'class':'button button-pink',
  },[
    ForceWebsite.buildElement('i',null,{
      'class':'fa fa-edit',
    }),
    document.createTextNode('Edit Config'),
  ]),
  nback=ForceWebsite.buildElement('button',null,{
    'class':'button button-blue',
  },[
    ForceWebsite.buildElement('i',null,{
      'class':'fa fa-arrow-left',
    }),
    document.createTextNode('Back'),
  ]),
  nkdp=ForceWebsite.buildElement('div',null,{
    'class':'crispies-buttons',
  },[
    nback,norder,ninbox,nconfig,
  ]);
  nback.onclick=function(e){
    ForceWebsite.go(ForceWebsite.kkey+'=dashboard');
  };
  nconfig.onclick=function(e){
    ForceWebsite.go(ForceWebsite.kkey
      +'=plug&ns=crispies&page=config');
  };
  nslider.onclick=function(e){
    ForceWebsite.go(ForceWebsite.kkey
      +'=plug&ns=crispies&page=slider');
  };
  ninbox.onclick=function(e){
    ForceWebsite.go(ForceWebsite.kkey
      +'=plug&ns=crispies&page=inbox');
  };
  norder.onclick=function(e){
    ForceWebsite.go(ForceWebsite.kkey
      +'=plug&ns=crispies&page=order');
  };
  nkdp.appendTo(ForceWebsite.body);
  
  var nform=ForceWebsite.buildElement('form'),
  ndp=ForceWebsite.buildElement('div',null,{
    'class':'crispies-data',
  },[
    
  ]);
  nform.appendTo(ForceWebsite.body);
  nform.onsubmit=function(e){
    e.preventDefault();
    var formdata={},
    nsave=e.submitter;
    for(var p of e.target){
      p.disabled=true;
      if(p.name){
        if(!formdata.hasOwnProperty(p.dataset.key)){
          formdata[p.dataset.key]={};
        }
        var pval=p.value;
        if(p.value.match(/^\d+(\.\d+)?$/)){
          pval=parseFloat(p.value);
        }else if(p.value=='true'){
          pval=true;
        }else if(p.value=='false'){
          pval=false;
        }
        formdata[p.dataset.key][p.dataset.name]=pval;
      }
    }
    _this.data.special.list=[];
    for(var i in formdata){
      _this.data.special.list.push(formdata[i]);
    }
    nsave.value='Saving...';
    ForceWebsite.request('crispy.put',function(r){
      for(var p of e.target){
        p.disabled=false;
      }
      nsave.value='Save';
      if(r.trim().match(/^error/i)){
        return _this.Force.splash(r);
      }
      _this.Force.splash('Saved.');
    },{
      content:JSON.stringify(_this.data),
    });
    return false;
  };
  ndp.appendTo(nform);
  ForceWebsite.fetch('crispy.fetch',function(r){
    _this.data=r;
    var nrow=ForceWebsite.buildElement('div',null,{
      'class':'crispies-row',
    },[
      ForceWebsite.buildElement('h1','Special Items'),
    ]);
    nrow.appendTo(ndp);
    for(var o in r.special.list){
      var p=r.special.list[o],
      d=_this.table();
      for(var i in p){
        var irow=ForceWebsite.buildElement('input',null,{
          'class':'kitchen-input-title',
          'name':i+'['+o+']',
          'data-key':o,
          'data-name':i,
          'value':''+p[i]
        });
        d.addRowElement(i,irow);
      }
      var nrow=ForceWebsite.buildElement('div',null,{
        'class':'crispies-row',
      },[d]);
      nrow.appendTo(ndp);
    }
    var nsave=ForceWebsite.buildElement('input',null,{
      'class':'save',
      'type':'submit',
      'value':'Save',
      'data-after':'Save',
      'data-before':'Saving...',
    }),
    nrow=ForceWebsite.buildElement('div',null,{
        'class':'crispies-row',
    },[nsave]);
    nrow.appendTo(ndp);
  });
};
/* kitchen slider */
this.kitchenSlider=function(plug){
  var p='',
  _this=this,
  nback=ForceWebsite.buildElement('button',null,{
    'class':'button button-blue',
  },[
    ForceWebsite.buildElement('i',null,{
      'class':'fa fa-arrow-left',
    }),
    document.createTextNode('Back'),
  ]),
  nkdp=ForceWebsite.buildElement('div',null,{
    'class':'crispies-data',
  },[
    nback,
  ]);
  nback.onclick=function(e){
    ForceWebsite.go(ForceWebsite.kkey+'=plug&ns=crispies');
  };
  nkdp.appendTo(ForceWebsite.body);
  
  var nform=ForceWebsite.buildElement('form'),
  ndp=ForceWebsite.buildElement('div',null,{
    'class':'crispies-data',
  },[
    
  ]);
  nform.appendTo(ForceWebsite.body);
  nform.onsubmit=function(e){
    e.preventDefault();
    var formdata={},
    nsave=e.submitter;
    for(var p of e.target){
      p.disabled=true;
      if(p.name){
        if(!formdata.hasOwnProperty(p.dataset.key)){
          formdata[p.dataset.key]={};
        }
        var pval=p.value;
        if(p.value.match(/^\d+(\.\d+)?$/)){
          pval=parseFloat(p.value);
        }else if(p.value=='true'){
          pval=true;
        }else if(p.value=='false'){
          pval=false;
        }
        formdata[p.dataset.key][p.dataset.name]=pval;
      }
    }
    _this.data.hero.carousel.items=[];
    for(var i in formdata){
      _this.data.hero.carousel.items.push(formdata[i]);
    }
    nsave.value='Saving...';
    ForceWebsite.request('crispy.put',function(r){
      for(var p of e.target){
        p.disabled=false;
      }
      nsave.value='Save';
      if(r.trim().match(/^error/i)){
        return _this.Force.splash(r);
      }
      _this.Force.splash('Saved.');
    },{
      content:JSON.stringify(_this.data),
    });
    return false;
  };
  ndp.appendTo(nform);
  ForceWebsite.fetch('crispy.fetch',function(r){
    _this.data=r;
    var nrow=ForceWebsite.buildElement('div',null,{
      'class':'crispies-row',
    },[
      ForceWebsite.buildElement('h1','Slider on Header'),
    ]);
    nrow.appendTo(ndp);
    for(var o in r.hero.carousel.items){
      var p=r.hero.carousel.items[o],
      d=_this.table();
      for(var i in p){
        var irow=ForceWebsite.buildElement('input',null,{
          'class':'kitchen-input-title',
          'name':i+'['+o+']',
          'data-key':o,
          'data-name':i,
          'value':''+p[i]
        });
        d.addRowElement(i,irow);
      }
      var nrow=ForceWebsite.buildElement('div',null,{
        'class':'crispies-row',
      },[d]);
      nrow.appendTo(ndp);
    }
    var nsave=ForceWebsite.buildElement('input',null,{
      'class':'save',
      'type':'submit',
      'value':'Save',
      'data-after':'Save',
      'data-before':'Saving...',
    }),
    nrow=ForceWebsite.buildElement('div',null,{
        'class':'crispies-row',
    },[nsave]);
    nrow.appendTo(ndp);
  });
};
/* kitchen order */
this.kitchenOrder=function(plug){
  var p='',
  _this=this,
  nback=ForceWebsite.buildElement('button',null,{
    'class':'button button-blue',
  },[
    ForceWebsite.buildElement('i',null,{
      'class':'fa fa-arrow-left',
    }),
    document.createTextNode('Back'),
  ]),
  ndp=ForceWebsite.buildElement('div',null,{
    'class':'crispies-data',
  },[
    nback,
  ]);
  nback.onclick=function(e){
    ForceWebsite.go(ForceWebsite.kkey+'=plug&ns=crispies');
  };
  ndp.appendTo(ForceWebsite.body);
  ForceWebsite.request('crispy.order',function(r){
    var nrow=ForceWebsite.buildElement('div',null,{
      'class':'crispies-row',
    },[
      ForceWebsite.buildElement('h1','Order (Reservation)'),
    ]);
    nrow.appendTo(ndp);
    var l=r.length;
    while(l--){
      var p=r[l],
      d=_this.table();
      for(var i in p){
        if(i=='microtime'){
          var dt=new Date(Math.floor(p[i]*1000));
          d.addRow('created-at',dt.toString());
        }
        d.addRow(i,p[i]+'');
      }
      var row=ForceWebsite.buildElement('div',null,{
        'class':'crispies-row',
      },[d]);
      row.appendTo(ndp);
    }
  });
};
/* kitchen inbox */
this.kitchenInbox=function(plug){
  var p='',
  _this=this,
  nback=ForceWebsite.buildElement('button',null,{
    'class':'button button-blue',
  },[
    ForceWebsite.buildElement('i',null,{
      'class':'fa fa-arrow-left',
    }),
    document.createTextNode('Back'),
  ]),
  ndp=ForceWebsite.buildElement('div',null,{
    'class':'crispies-data',
  },[
    nback,
  ]);
  nback.onclick=function(e){
    ForceWebsite.go(ForceWebsite.kkey+'=plug&ns=crispies');
  };
  ndp.appendTo(ForceWebsite.body);
  ForceWebsite.request('crispy.inbox',function(r){
    var nrow=ForceWebsite.buildElement('div',null,{
      'class':'crispies-row',
    },[
      ForceWebsite.buildElement('h1','Inbox (Contact)'),
    ]);
    nrow.appendTo(ndp);
    var l=r.length;
    while(l--){
      var p=r[l],
      d=_this.table();
      for(var i in p){
        if(i=='microtime'){
          var dt=new Date(Math.floor(p[i]*1000));
          d.addRow('created-at',dt.toString());
        }
        d.addRow(i,p[i]+'');
      }
      var ninbox=ForceWebsite.buildElement('div',null,{
        'class':'crispies-row',
      },[d]);
      ninbox.appendTo(ndp);
    }
  });
};
/* kitchen config */
this.kitchenConfig=async function(plug){
  await this.Force.alert("Please be careful!\nDo not edit this file if you don't understand JSON syntax!");
  var p='',
  _this=this,
  ntitle=ForceWebsite.buildElement('input',null,{
    'class':'kitchen-input-title',
    'value':'crispy.json',
    'disabled':'true',
  }),
  ncontent=ForceWebsite.buildElement('textarea',null,{
    'class':'kitchen-input-content crispies-textarea',
    'placeholder':'Loading...',
  }),
  nsave=ForceWebsite.buildElement('input',null,{
    'class':'save',
    'type':'submit',
    'value':'Save',
    'data-after':'Save',
    'data-before':'Saving...',
  }),
  nback=ForceWebsite.buildElement('button',null,{
    'class':'button button-blue',
  },[
    ForceWebsite.buildElement('i',null,{
      'class':'fa fa-arrow-left',
    }),
    document.createTextNode('Back'),
  ]),
  ndp=ForceWebsite.buildElement('div',null,{
    'class':'crispies-buttons',
  },[
    ntitle,ncontent,nback,nsave,
  ]);
  nback.onclick=function(e){
    ForceWebsite.go(ForceWebsite.kkey+'=plug&ns=crispies');
  };
  nsave.onclick=function(e){
    ncontent.disabled=true;
    nback.disabled=true;
    nsave.disabled=true;
    nsave.value='Saving...';
    ForceWebsite.request('crispy.put',function(r){
      ncontent.disabled=false;
      nback.disabled=false;
      nsave.disabled=false;
      nsave.value='Save';
      if(r.trim().match(/^error/i)){
        return _this.Force.splash(r);
      }
      _this.Force.splash('Saved.');
    },{
      content:ncontent.value,
    });
  };
  ndp.appendTo(ForceWebsite.body);
  ForceWebsite.fetch('crispy.get',function(r){
    ncontent.value=r;
  });
};
/* table */
this.table=function(){
  var tbody=ForceWebsite.buildElement('tbody'),
  thead=ForceWebsite.buildElement('thead'),
  table=ForceWebsite.buildElement('table',null,{
    'class':'crispies-table',
    'cellpadding':'0px',
    'cellspacing':'0px',
    'border':'0px',
  },[thead,tbody]);
  table.body=tbody;
  table.head=thead;
  table.addRow=function(key,value){
    var td1=ForceWebsite.buildElement('td',key),
    td2=ForceWebsite.buildElement('td',value),
    trow=ForceWebsite.buildElement('tr',null,{},[td1,td2]);
    trow.appendTo(this.body);
    return this;
  };
  table.addRowElement=function(key,value){
    var td1=ForceWebsite.buildElement('td',key),
    td2=ForceWebsite.buildElement('td',null,{},[value]),
    trow=ForceWebsite.buildElement('tr',null,{},[td1,td2]);
    trow.appendTo(this.body);
    return this;
  };
  return table;
};
};

