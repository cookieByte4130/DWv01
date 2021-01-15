$(function(){
  function changeScreen(currScreen,nextScreen){
    $(`.${currScreen}`).fadeOut('slow');
    $(`.${nextScreen}`).delay(1000).fadeIn('slow');
  }//end changeScreen function

  function saveGame(){
    localStorage.DWCharacter=JSON.stringify(Hero);
  }//end saveGame function
  
  function continueGame(){
    let archivedCh=JSON.parse(window.localStorage.DWCharacter);
    Hero=new GoodGuy('name','elem');
    Object.assign(Hero,archivedCh);
    questElements();
    Hero.runesCollected.forEach((rune)=>{$(`.rune${rune}`).show()});
    for(let abl in Hero.abilities){
      updateLesson('abilities',abl,Hero.abilities[abl].name);
      Hero.abilities[abl].cast=Lessons.abilities[abl].cast;
    }
    for(let spl in Hero.spells){
      updateLesson('spells',spl,Hero.spells[spl].name);
      Hero.spells[spl].cast=Lessons.spells[spl].cast;
    }
    noticeQ=[];
    Hero.updateAllStats();
    if(Hero.runesCollected.length===4){
      $('.rune').addClass('pulsing');
      $('.finalBoss')
        .show()
        .addClass('pulsing');
    }
  }//end continueGame function
  
  function forceFieldSet(boolVal){
    boolVal?$(`.forceField`).css('z-index',9800):$(`.forceField`).css('z-index',-300);
  }//end forceFieldSet function

  let nextSlide;
  function storytelling(slidesClass,slideName,slideIndex){
    let btnTxt;
    let transition=2000;
    let currSlide=slideName+slideIndex;
    $(`.${currSlide}`).fadeIn(transition);
    if(slideIndex===$(`.${slidesClass}`).length-1){
      if(slideName==='intro'){
        btnTxt='Play';
      }else if(slideName==='end'){
        btnTxt='Next';
      }//end if/else
      $(`.${slidesClass}`)
      .parent().parent()
      .find('.skipSlideShowBtn')
        .removeClass('btn-outline-light')
        .text(btnTxt)
        .addClass('customBtn pulsing btn-lg')
      .siblings('.nextSlideBtn').hide();
    }else{
      let dialogLength=$(`.${currSlide}`).text().length;
      let hideSlide=setTimeout(function(){
        $(`.${currSlide}`).fadeOut(transition);
      },45*dialogLength);
      nextSlide=setTimeout(function(){
        storytelling(slidesClass,slideName,slideIndex+1);
      },transition+(45*dialogLength));
      
      $(`.nextSlideBtn`).click(function(){
        clearTimeout(hideSlide);
        clearTimeout(nextSlide);
        $(`.${currSlide}`).fadeOut(1500);
        nextSlide= setTimeout(function(){
          storytelling(slidesClass,slideName,slideIndex+1);
        },1500);
      });
    }//end if/else
  }//end storytelling
  
  let noticeQ=[];
  function notify(){
    //prevent player from clicking anything but the notice box
    forceFieldSet(true);
    //if there are arguments, display those
    if(arguments.length>0){
      $(`.noticeText`).html(arguments[0]);
    //if no arguments, display noticeQ
    }else{
      //show and remove first item in noticeQ
      $(`.noticeText`).html(noticeQ.shift());
    }
    if(noticeQ.length>0){
      $(`.notice button`)
        .unbind('click')
        .html('<i class="ion-android-arrow-forward"></i>')
        .click(function(){
          notify();
        });
    }else{
      $(`.notice button`)
      .unbind('click')
      .html('&times;')
      .click(function(){
        $('.notice').hide();
        forceFieldSet(false);
      });
    }
    $('.notice').show();
  }//end notify function
  
  function plantTooltips(){
    $('.plant').each(function(){
      let p=$(this).text().trim();
      if(p!==''){
        let a=Plants[p].increases;
        if(Hero.plantsEaten<Hero.lvl){
          $(this).attr('title',`${p} boosts ${a}`);
        }else if(a==='agi'||a==='str'){
          $(this).attr('title','regain HP');
        }else if(a==='per'||a==='int'){
          $(this).attr('title','regain MP');
        }
      }
    });
  }//end plantTooltips function
  
  function updateLesson(type,id,lessonName){
    switch(type){
      case 'abilities':
        htmlRef="HeroAbilities";
        htmlLiClass="ability";
        break;
      case 'spells':
        htmlRef="HeroSpells";
        htmlLiClass="spell";
    }//end switch
    //update html
    $(`.${htmlRef} ul`).prepend(`<li class="${htmlLiClass}">${lessonName}</li>`);
    $(`#aboutAttacks dl`).append(`<dt>${lessonName}</dt><dd>${Lessons[type][id].details}</dd>`);
    //add event listeners to new nodes
    $(`.battleScreen .${htmlRef} li`).unbind();
    $(`.battleScreen .${htmlRef} li`).click(function(){
      let type=$(this)[0].classList[0];
      //id text and make move
      move(camelCase($(this).text()),type);
    });// end click event
  }//end updateLesson
  
  function eldersLessons(type){
    let teachingCounter=0;
    for(let subject in Lessons[type]){
      let lesson=Lessons[type][subject];
      if(lesson.lvl<=Hero.lvl){
        if(!Hero[type].hasOwnProperty(subject)){
          teachingCounter+=1;
          noticeQ.push(`${lesson.name} ${lesson.details}`);
          Hero[type][camelCase(lesson.name)]=lesson;
          updateLesson(type,camelCase(lesson.name),lesson.name);
        }//end if hero has this lesson already
      }//end if levels match
    }//end for loop
    if(teachingCounter>0){
      noticeQ.unshift(`Ah ${Hero.name}, I think it's time for a lesson...`);
    }else{
      if(Hero.lvl<5){
        noticeQ.push(`Come to me when you reach level ${Hero.lvl+1} and I will give you another ${type} lesson.`);
      }else{
        noticeQ.push(`I have taught you all I know<br>Hurry and defeat ${Enemies.finalBoss.name}`);
      }
    }
  }//end eldersLessons
    
  function landPrep(landElem){
    //modify land to match element
    $('.landScreen')
      .find('.charactersContainer')
      .css('background-image',Elements[landElem].bgImg);
    $('.landScreen-header')
      .css('background-image','linear-gradient(to right, '+Elements[landElem].color+' 40%, #00000000)')
      .find('.land')
        .text(`${landElem} Land`);
    //populates other land with plants to match element
    for(let i=0;i<3;i++){
      let plant= Elements[landElem].plants[i];
      let atr=(Plants[plant].increases).toUpperCase();
      $(`.landScreen .plant${i}`)
        .find('.characterImage')
        .css('background-image',Plants[plant].image);
       $(`.landScreen .plant${i}`)
        .find('.characterName').text(plant);
    }
    plantTooltips();
    //populates other land with enemies to match element
    for(let i=0;i<Elements[landElem].lesserCr.length;i++){
      let enemy=Elements[landElem].lesserCr[i];
      $(`.landScreen .enemy${i}`)
      .attr('title', `Fight ${enemy}`)
        .find('.characterImage')
        .css('background-image',`url("${Enemies[enemy].image}")`);
      $(`.landScreen .enemy${i}`)
        .find('.characterName').text(enemy);
    }
    //automatically hides boss
    $('.landScreen .boss').hide();
    //if the boss has been unlocked boss becomes visible
    if(Hero.bossesUnlocked.includes(Elements[landElem].boss)){
      let currBoss=Enemies[Elements[landElem].boss];
      $(`.landScreen .boss`)
      .show()
      .attr('title',`Fight ${currBoss.name}`)
        .find('.characterImage')
        .css('background-image',`url("${currBoss.image}")`);
      $(`.landScreen .boss`)
        .find('.characterName').text(currBoss.name);
    }//end if
  }//end landPrep
  
  function enemyPrep(enemyId,enemyElem){
    $('.EnemyImg').removeClass('dead');
    Enemy= new BadGuy(Enemies[enemyId].name, enemyElem);
    Enemy.id=enemyId;
    Enemy.type=Enemies[enemyId].type;
    Enemy.previouslyDefeated=Hero.enemiesDefeated.includes(enemyId);
    Enemy.image=Enemies[Enemy.id].image;
    $('.EnemyName').text(Enemy.name);
    $('.EnemyImg').css('background-image',`url("${Enemy.image}")`);
    let enemyLvl=Enemy.previouslyDefeated?(Math.floor(Math.random()*Hero.lvl)+1):Hero.lvl;
    while(Enemy.lvl<enemyLvl){
      Enemy.lvlUp();
      Enemy.updateAllStats();
    }
    for(let abl in Enemies[Enemy.id].abilities){
      Enemy.abilities[Enemies[Enemy.id].abilities[abl]]=(Lessons.abilities[Enemies[Enemy.id].abilities[abl]]);
    }
    for(let spl in Enemies[Enemy.id].spells){
      Enemy.spells[Enemies[Enemy.id].spells[spl]]=(Lessons.spells[Enemies[Enemy.id].spells[spl]]);
    }
    $('.battleScreen')
      .find('.charactersContainer')
      .css('background-image', `linear-gradient(145deg, #ff00007a, #be0000c2),${Elements[enemyElem].bgImg}`);
  }
  
  function move(selectedAction,type){
    let turnTaken=false;
    //execute player's action
    if(type==='ability'){
      if(selectedAction==='flee'){
        turnTaken=Hero.abilities[selectedAction].cast.call(Hero,Enemy);
      }else{
        Hero.abilities[selectedAction].cast.call(Hero,Enemy);
        turnTaken=true;
      }
    }else if(type==='spell'){
      //if unable to cast spell, player must choose another action
      turnTaken=Hero.spells[selectedAction].cast.call(Hero,Enemy);
      if(!turnTaken){
        notify();
      }
    }//end if
    
    if(turnTaken){
      //hide battleOptions
        $('.battleOptions').hide();
      //engage forcefield to prevent player from acting during enemy's turn
      forceFieldSet(true);
      let lemmeThink;
      //check enemy's health
      if(Enemy.currHP>0){
        lemmeThink= setTimeout(function(){
          //enemy selects random action from their spells and abilities based on their attr
          let magPreference=Enemy.per+Enemy.int;
          let phyPreference=Enemy.str+Enemy.agi;
          let magVsMelee=rollDice()+(phyPreference-magPreference);
          if(magVsMelee<11){
            enemyMove('spells');
          }else{
            enemyMove('abilities');
          }
          //did the hero survive?
          let deathBlow = setTimeout(function(){
            Hero.checkDeath(Enemy);
            forceFieldSet(false);
          },1500);
        },1500);
        //if the enemy died
      }else{
        $('.EnemyImg').addClass('dead');
        noticeQ.push(`${Hero.name} defeated ${Enemy.name}`);
        let gainedXP=(rollDice()*Enemy.lvl);
        
        //if the enemy was a boss and it was the first time defeated get rune
        if(Enemy.type==='boss'&&!Enemy.previouslyDefeated){
          Hero.enemiesDefeated.push(Enemy.id);
          gainedXP+=30;
          noticeQ.push(`You recieved the ${Enemy.element} rune!`);
          Hero.runesCollected.push(Enemy.element);
          //if this rune makes four->make runes shiny ^_^
          if(Hero.runesCollected.length===4){
            $('.rune').addClass('pulsing');
            $('.finalBoss')
              .show()
              .addClass('pulsing');
          }
          $(`.rune${Enemy.element}`).show();
        //if the enemy is not a boss and all 3 enemies of land have been defeated, unlock boss
        }else if(Enemy.type==='lesserCr'&&!Hero.bossesUnlocked.includes(Elements[Enemy.element].boss)){
          if(!Enemy.previouslyDefeated){
            Hero.enemiesDefeated.push(Enemy.id);
            gainedXP+=10;
            let unlockBoss=true;
            for(let cr of Elements[Enemy.element].lesserCr){
              if(!Hero.enemiesDefeated.includes(cr)){
                unlockBoss=false;
                break;
              }
            }
            if(unlockBoss)Hero.bossesUnlocked.push(Enemies[Elements[Enemy.element].boss].id);
          }
          if(Hero.bossesUnlocked.includes(Elements[Enemy.element].boss)){
            $(`.landScreen .boss`)
            .show()
            .attr('title',`Fight the ${Enemies[Elements[Enemy.element].boss].id}`)
              .find('.characterImage')
              .css('background-image',`url("${Enemies[Elements[Enemy.element].boss].image}")`);
            $(`.landScreen .boss`)
              .find('.characterName').text(Enemies[Elements[Enemy.element].boss].id);
            noticeQ.push(`${Enemies[Elements[Enemy.element].boss].name} is challenging you to fight`);
          }
        }//end if
          
        lemmeThink=setTimeout(function(){
          //if the enemy was the final boss show end story arc
          if(Enemy.id==="finalBoss"){
            changeScreen('battleScreen','end');
            forceFieldSet(false);
            storytelling('endPage','end',0);
          }else{
            //player can earn xp until they reach level 5
            if(Hero.lvl<5){
              if((Hero.lvl===4)&&(Hero.xp+gainedXP>Hero.xpToNextLvl)){
                gainedXP=Hero.xpToNextLvl-Hero.xp;
              }
              Hero.gainXP(gainedXP);
            }
            notify();
            //clear battle log
            $('.battleLog').text('');
            //go back to land screen
            changeScreen('battleScreen','landScreen');
          }
        },1500);
      }
    }
  };//end move click event
  
  function enemyMove(type){
    let enemyAttacks=Object.keys(Enemy[type]);
    let randomAttackSelector=Math.floor(Math.random()*enemyAttacks.length);
    let randomAttackChoice=enemyAttacks[randomAttackSelector];
    if(type==='spells'){
      successfulSpell=Enemy[type][randomAttackChoice].cast.call(Enemy,Hero);
      if(!successfulSpell){
        enemyMove('abilities');
      }
    }else{
      Enemy[type][randomAttackChoice].cast.call(Enemy,Hero);
    }
  }//end enemyMove
  
  function rollDice(){
    return Math.ceil(Math.random()*20);
  }//end rollDice
  
  function camelCase(text){
  	let newText=text.split(" ");
  	newText[0]=newText[0].charAt(0).toLowerCase()+newText[0].slice(1);
  	newText=newText.join('');
  	return newText;
  }//end camelCase
  
  function battleUpdate(target,info){
    if(info.startsWith('+')){
      $(`.battleUpdates${target}`)
        .css('color','#4ca316');
    }else if(info.startsWith('-')){
      $(`.battleUpdates${target}`)
        .css('color','#ffc107');
      $(`.${target}Img`).effect('shake');
    }else{
      $(`.battleUpdates${target}`)
        .css('color','#ece2e2');
    }
    $(`.battleUpdates${target}`)
      .text(info)
      .show();
    let hideAgain = setTimeout(function(){
      $(`.battleUpdates${target}`).hide();
    },750);
  }

  function questElements(){
    //hero image selected and displayed
    $('.HeroImg').css('background-image',`url(${Hero.image})`);
    //customize nest to selected element
    $('.nest').find('.charactersContainer').css('background-image',Elements[Hero.element].bgImg);
    $('.nestScreen-header').css('background-image','linear-gradient(to right, '+Elements[Hero.element].color+' 40%, #00000000)');
    //populate nest with plants to match element
    for(let i=0;i<3;i++){
      let elem=Hero.element;
      let plant= Elements[elem].plants[i];
      let atr=(Plants[plant].increases).toUpperCase();
      $(`.nest .plant${i} .characterImage`).css('background-image',Plants[plant].image);
      $(`.nest .plant${i} .characterName`).text(plant);
    }//end for-loop
    plantTooltips();
    //change hero's element land to say nest
    $(`.${Hero.element}Land`).html(`${Hero.element}<br>Nest`);
  }//end questElements function
  
  //generic character creation class
  class Character{
    constructor(name,element){
      this.name=name;
      this.lvl=0;
      this.element=element;
      this.str=1;
      this.agi=1;
      this.per=1;
      this.int=1;
      this.maxHP=10;
      this.currHP=10;
      this.maxMP=10;
      this.currMP=10;
      this.abilities={};
      this.spells={};
      this.image="assets/gamingIcon.png";
    }//end Character constructor
    
    lvlUp() {
      //increase level
      this.lvl+=1;
    
      //update attributes according to element
      switch(this.element){
        case('fire'):
          this.str+=3;
          this.agi+=3;
          this.int+=2;
          this.per+=2;
          break;
        case('rock'):
          this.str+=4;
          this.agi+=1;
          this.int+=3;
          this.per+=2;
          break;
        case('water'):
          this.str+=3;
          this.agi+=2;
          this.int+=4;
          this.per+=1;
          break;
        case('air'):
          this.str+=1;
          this.agi+=4;
          this.int+=3;
          this.per+=2;
          break;
      }//end attributes update switch
      //increase HP and MP
      this.maxHP=Math.floor((10*Math.sqrt(this.lvl))+(this.str*this.lvl));
      this.currHP=this.maxHP;
      this.maxMP=Math.floor((10*Math.sqrt(this.lvl))+(this.int*this.lvl));
      this.currMP=this.maxMP;
      //Hero xp Pts
      if(this instanceof GoodGuy){
        if(this.lvl<5){
          this.xpToNextLvl=Math.floor(8*Math.exp(this.lvl));
          this.xpMin=this.xpToNextLvl;
        }
      }
    }//end lvlUp method
    
    updateAllStats(){
      //update html
      $(`.${this.role}Name`).text(this.name);
      $(`.element`).text(this.element);
      $(`.${this.role}Str`).text(this.str);
      $(`.${this.role}Agi`).text(this.agi);
      $(`.${this.role}Int`).text(this.int);
      $(`.${this.role}Per`).text(this.per);
      $(`.${this.role}CurrHP`).text(this.currHP);
      $(`.${this.role}MaxHP`).text(this.maxHP);
      $(`.${this.role}HPBar .progress`).attr('title',`HP ${this.currHP}/${this.maxHP}`);
      let hpPercentage=(this.currHP/this.maxHP)*100;
      $(`.${this.role}HPBar .progress-bar`).css('width', `${hpPercentage}%`);
      $(`.${this.role}CurrMP`).text(this.currMP);
      $(`.${this.role}MaxMP`).text(this.maxMP);
      $(`.${this.role}MPBar .progress`).attr('title',`MP ${this.currMP}/${this.maxMP}`);
      let mpPercentage=(this.currMP/this.maxMP)*100;
      $(`.${this.role}MPBar .progress-bar`).css('width', `${mpPercentage}%`);
      $(`.${this.role}Lvl`).text(this.lvl);
      if(this instanceof GoodGuy){
        $(`.${this.role}Xp`).text(this.xp);
        $(`.${this.role}XpToNextLvl`).text(this.xpToNextLvl);
      };
    }//end updateAllStats method

    updateStat(value,stat){
      //update object
      this[stat]=value;
      //modify for html
      let capital=stat.charAt(0).toUpperCase();
      let classStat=stat.replace(stat.charAt(0),capital);
      $(`.${this.role}${classStat}`).text(this[stat]);
      if(stat==='currMP'||stat==="currHP"){
        let base=stat.slice(-2);
        let maximum= "max"+base;
        $(`.${this.role}${base}Bar .progress`).attr('title',`${base} ${this[stat]}/${this[maximum]}`);
        let percentage=(this[stat]/this[maximum])*100;
        $(`.${this.role}${base}Bar .progress-bar`).css('width', `${percentage}%`);
      }
    }//end updateStat method
    
    fullHeal(){
      this.updateStat(this.maxHP,"currHP");
    }//end fullHeal method
    
    fullMP(){
      this.updateStat(this.maxMP,"currMP");
    }
  }//end Character constructor
  
  class GoodGuy extends Character{
    constructor(name,element){
      super(name,element);
      this.role='Hero';
      this.xp=0;
      this.xpMin=0;
      this.xpToNextLvl=0;
      this.plantsEaten=0;
      this.runesCollected=[];
      this.enemiesDefeated=[];
      this.bossesUnlocked=[];
    }//end GoodGuy constructor
    
    checkDeath(opponent){
      if(this.currHP<=0){
        //reset enemy
        opponent.lvl=0;
        //calculate xp cost
        let xpLost=Math.floor((this.xpToNextLvl-this.xp)*0.05);
        let newXp=this.xp-xpLost;
        if(newXp<=this.xpMin){
          this.updateStat(this.xpMin,"xp");
          notify(`${this.name} was defeated by ${opponent.name}<br>but the elders revived you`);
        }else{
          this.updateStat(newXp,"xp");
          notify(`${this.name} was defeated by ${opponent.name}<br>but the elders revived you<br>for the small fee of ${xpLost}xp`);
        }//end if
        //reset Hero's HP
        this.fullHeal();
        $('.battleLog').text('');
        changeScreen('battleScreen','nest');
      }else{
        $('.battleOptions').fadeIn();
      }//end if
    }//end checkDeath method
    
    gainXP(xpPts){
      this.updateStat(this.xp+=xpPts,'xp');
      if(this.xp>=this.xpToNextLvl){
        this.lvlUp();
        this.updateAllStats();
        if(this.lvl>1){
          noticeQ.push(`${this.name} leveled up!`);
        }//end if
      }//end if
      if(xpPts>0){
        noticeQ.push(`You gained ${xpPts}xp!`);
      }//end if
    }//end gainXP method
  }//end GoodGuy extension
  
  class BadGuy extends Character{
    constructor(name,element){
      super(name,element);
      this.role='Enemy';
    }//end BadGuy constructor
  }//end BadGuy extension
  
  const Elements={
    fire:{
      color: 'rgba(193, 59, 49 ,0.8)',
      colorSecondary: 'rgba(254, 183, 35, 0.8)',
      bgImg: "url('assets/bgFire.jpg')",
      plants: ['cacti','brush','yucca'],
      lesserCr: ['camel','lizard','coyote'],
      boss: 'phoenix',
      rune: "url('assets/runeFire.png')"
    },
    rock:{
      color: 'rgba(125, 119, 133 ,0.8)',
      colorSecondary: 'rgba(65, 133, 69, 0.8)',
      bgImg: "url('assets/bgRock.jpg')",
      plants: ['tree','shroom','flower'],
      lesserCr: ['goat','bat','eagle'],
      boss: 'golem',
      rune: "url('assets/runeRock.png')"
    },
    water:{
      color: 'rgba(77, 158, 197 ,0.8)',
      colorSecondary: 'rgba(77, 197, 169, 0.8)',
      bgImg: "url('assets/bgWater.jpg')",
      plants: ['seaweed','coral','brush'],
      lesserCr: ['fish','crab','seabird'],
      boss: 'leviathan',
      rune: "url('assets/runeWater.png')"
    },
    air:{
      color: 'rgba(146, 199, 249 ,0.8)',
      colorSecondary: 'rgba(, 236, 234, 0.8)',
      bgImg: "url('assets/bgAir.jpeg')",
      plants:['grass','flower','shroom'],
      lesserCr: ['birds','bees','buffalo'],
      boss: 'gryphon',
      rune: "url('assets/runeAir.png')"
    },
    celestial:{
      color: 'rgba(188, 207, 225 ,0.8)',
      colorSecondary: 'rgba(226, 236, 234, 0.8)',
      bgImg: "url('assets/bgCelestial.jpeg')",
      boss: "finalBoss"
    }
  };
  
  const Enemies={
    finalBoss:{
      id:'finalBoss',
      type: 'finalBoss',
      name:"Gorgax",
      image:'assets/finalBoss.png',
      abilities:['swoop','bite','spit','claw','swipe'],
      spells:['simpleHealing','manaBlast','spellofSages']
    },
    phoenix:{
      id:'phoenix',
      type: 'boss',
      name:'Navi',
      image:'assets/phoenix.jpg',
      abilities:['swoop','bite','claw'],
      spells:['simpleHealing','manaBlast','spellofSages']
    },
    golem:{
      id:'golem',
      type: 'boss',
      name:'Ganon',
      image:"assets/golem.jpg",
      abilities:['bite','spit','claw'],
      spells:['simpleHealing','simpleSpell']
    },
    leviathan:{
      id:'leviathan',
      type: 'boss',
      name:'Plankton',
      image:'assets/leviathan.png',
      abilities:['bite','spit'],
      spells:['simpleHealing','manaBlast','spellofSages']
    },
    gryphon:{
      id:'gryphon',
      type: 'boss',
      name:'Birdo',
      image:'assets/gryphon.jpg',
      abilities: ['swoop','bite','claw','spit'],
      spells:['simpleHealing','manaBlast','spellofSages','dragonBreath']
    },
    camel:{
      id:'camel',
      type:'lesserCr',
      name:'Oil Rig',
      image:"assets/camel.jpg",
      abilities:['spit','bite'],
      spells:['simpleHealing','simpleSpell']
    },
    lizard: {
      id:'lizard',
      type:'lesserCr',
      name:'Koopa Troopa',
      image:"assets/lizard.jpg",
      abilities:['spit','bite'],
      spells:['simpleHealing','simpleSpell']
    },
    coyote: {
      id:'coyote',
      type:'lesserCr',
      name:'Mononoke Hima',
      image:"assets/coyote.jpg",
      abilities:['bite','claw'],
      spells:['simpleHealing','simpleSpell']
    },
    goat: {
      id:'goat',
      type:'lesserCr',
      name:'Mem Ick',
      image:"assets/goat.jpg",
      abilities:['bite','spit'],
      spells:['simpleHealing','simpleSpell']
    },
    bat:{
      id:'bat',
      type:'lesserCr',
      name:'Stich',
      image:"assets/bat.jpg",
      abilities:['swoop','bite'],
      spells:['simpleHealing','simpleSpell']
    },
    eagle:{
      id:'eagle',
      type:'lesserCr',
      name:'Hal',
      image:"assets/eagle.jpg",
      abilities:['swoop','claw'],
      spells:['simpleHealing','simpleSpell']
    },
    fish:{
      id:'fish',
      type:'lesserCr',
      name:'Nemo',
      image:"assets/fish.jpg",
      abilities:['bite','swipe'],
      spells:['simpleHealing','simpleSpell']
    },
    crab:{
      id:'crab',
      type:'lesserCr',
      name:'Tamatoa',
      image:"assets/crab.jpg",
      abilities:['claw','bite'],
      spells:['simpleHealing','simpleSpell']
    },
    seabird:{
      id: 'seabird',
      type:'lesserCr',
      name: 'Squidworth',
      image:"assets/seabird.jpg",
      abilities:['swoop','spit'],
      spells:['simpleHealing','simpleSpell']
    },
    birds:{
      id:'birds',
      type:'lesserCr',
      name: 'Donald Duck',
      image:"assets/birds.jpg",
      abilities:['swoop'],
      spells:['simpleHealing','simpleSpell']
    },
    bees:{
      id:'bees',
      type:'lesserCr',
      name: 'Spy Bot',
      image:"assets/bees.jpg",
      abilities:['bite','swoop'],
      spells:['simpleHealing','simpleSpell']
    },
    buffalo:{
      id:'buffalo',
      type:'lesserCr',
      name:'Ava Tarr',
      image:"assets/buffalo.png",
      abilities:['bite','spit'],
      spells:['simpleHealing','simpleSpell']
    },
  };//end Enemies
  
  const Plants={
    seaweed: {
      image: "url('assets/seaweed.jpg')",
      increases: 'int'
    },
    coral: {
      image: "url('assets/coral.jpg')",
      increases: 'str'
    },
    brush: {
      image: "url('assets/brush.jpg')",
      increases: 'agi'
    },
    cacti: {
      image: "url('assets/cacti.jpg')",
      increases: 'str'
    },
    yucca: {
      image: "url('assets/yucca.jpg')",
      increases: 'int'
    },
    tree: {
      image: "url('assets/tree.jpeg')",
      increases: 'str'
    },
    shroom: {
      image: "url('assets/shroom.jpg')",
      increases: 'per'
    },
    flower: {
      image: "url('assets/flower.jpg')",
      increases: 'int'
    },
    grass: {
      image: "url('assets/grass.jpeg')",
      increases: 'agi'
    }
  };//end Plants
  
  //dmg<=0 branch not currently used but prepped for future status effects
  //hairyCarrie && wrathOfKhan created for developement purposes ^_^
  const Lessons={
    abilities:{
      hairyCarrie:{
        name: 'Hairy Carrie',
        lvl:99,
        details: 'removes all but one of your own HP',
        cast: function(){
          let dmg=this.currHP-1;
          $('.battleLog').prepend(`${this.name} dealt ${dmg} damage to ${this.name}<br>`);
          this.currHP-=dmg;
          $(`.${this.role}CurrHP`).text(this.currHP);
          $(`.${this.role}HPBar .progress`).attr('title',`HP ${this.currHP}/${this.maxHP}`);
          let hpPercentage=(this.currHP/this.maxHP)*100;
          $(`.${this.role}HPBar .progress-bar`).css('width', `${hpPercentage}%`);
            battleUpdate(this.role,`-${dmg}`);
        }
      },//end hairyCarrie
      wrathOfKhan:{
        name: 'Wrath Of Khan',
        lvl:99,
        details: 'automatically kills opponent',
        cast: function(opponent){
          let dmg=1000;
          $('.battleLog').prepend(`${this.name} smote ${opponent.name} with the wrath of Khan<br>`);
          opponent.currHP-=dmg;
          $(`.${opponent.role}CurrHP`).text(opponent.currHP);
          $(`.${opponent.role}HPBar .progress`).attr('title',`HP ${opponent.currHP}/${opponent.maxHP}`);
          let hpPercentage=(opponent.currHP/opponent.maxHP)*100;
          $(`.${opponent.role}HPBar .progress-bar`).css('width', `${hpPercentage}%`);
          battleUpdate(opponent.role,`-${dmg}`);
        }//end cast
      },//end wrathOfKhan
      flee:{
        name: 'Flee',
        lvl:1,
        details: 'allows you to try and run away from the battle',
        cast: function(opponent){
          let run=rollDice()+this.agi;
          let chase=rollDice()+opponent.agi;
          if(this.role==="Hero"){
            if(run>=chase){
              notify(`${this.name}'s attempt to flee was successful.`);
              $('.battleLog').text('');
              if(Enemy.element==='celestial'){
                changeScreen('battleScreen','worldMap');
              }else{
                changeScreen('battleScreen','landScreen');
              }
              return false;
            }else{
              $('.battleLog').prepend(`${Hero.name}'s attempt to flee was unsuccessful<br>`);
              battleUpdate(this.role,'Fail');
              return true;
            }
          }
        }//end cast
      },//end flee
      claw:{
        name: 'Claw',
        lvl:1,
        details: 'uses your claws to inflict great damage to enemies',
        cast: function(opponent){
          let dmg;
          let toHitRoll=rollDice();
          let toHit=toHitRoll+(this.agi*1.1);
          let toDodge=rollDice()+opponent.agi;
          if(toHit>=toDodge){
            if(toHitRoll>18){
              dmg=Math.floor(this.str*1.25);
            }else{
              dmg=this.str;
            }
            if(dmg>0){
              $('.battleLog').prepend(`${this.name}'s claws dealt ${dmg} damage to ${opponent.name}<br>`);
              opponent.updateStat(opponent.currHP-dmg,'currHP');
              battleUpdate(opponent.role,`-${dmg}`);
            }else{
              $('.battleLog').prepend(`${this.name} gives ${opponent.name} a love tap<br>`);
              battleUpdate(opponent.role,'Fail');
            }
          }else{
            $('.battleLog').prepend(`${opponent.name} dodged ${this.name}'s claw attack<br>`);
            battleUpdate(opponent.role,'Missed');
          }
        }//end cast
      },//end claw
      bite:{
        name: 'Bite',
        lvl:2,
        details: 'use your teeth to inflict damage to enemies',
        cast: function(opponent){
          let dmg;
          let toHitRoll=rollDice();
          let toHit=toHitRoll+this.agi;
          let toDodge=rollDice()+opponent.agi;
          if(toHit>=toDodge){
            if(toHitRoll>18){
              dmg=this.str;
            }else{
              dmg=Math.floor(this.str*1.1);
            }
            if(dmg>0){
              $('.battleLog').prepend(`${this.name}'s bite dealt ${dmg} damage to ${opponent.name}<br>`);
              opponent.currHP-=dmg;
              $(`.${opponent.role}CurrHP`).text(opponent.currHP);
              $(`.${opponent.role}HPBar .progress`).attr('title',`HP ${opponent.currHP}/${opponent.maxHP}`);
              let hpPercentage=(opponent.currHP/opponent.maxHP)*100;
              $(`.${opponent.role}HPBar .progress-bar`).css('width', `${hpPercentage}%`);
              battleUpdate(opponent.role,`-${dmg}`);
            }else{
              $('.battleLog').prepend(`${this.name} gives ${opponent.name} a sweet nibble<br>`);
              battleUpdate(opponent.role,'Fail');
            }
          }else{
            $('.battleLog').prepend(`${opponent.name} dodged ${this.name}'s bite<br>`);
            battleUpdate(opponent.role,'Missed');
          }
        }//end cast
      },//end bite
      spit:{
        name: 'Spit',
        lvl:3,
        details: 'use your spit to inflict grossness on enemies',
        cast: function(opponent){
          let dmg;
          let toHitRoll=rollDice();
          let toHit=toHitRoll+this.agi;
          let toDodge=rollDice()+opponent.agi;
          if(toHit>=toDodge){
            if(toHitRoll>18){
              dmg=this.str+this.lvl;
            }else{
              dmg=this.str+1;
            }
            if(dmg>0){
              //idea for further development: temporairly reduce opponent's PER?
              $('.battleLog').prepend(`${this.name}'s spit dealt ${dmg} damage to ${opponent.name}<br>`);
              opponent.currHP-=dmg;
              $(`.${opponent.role}CurrHP`).text(opponent.currHP);
              $(`.${opponent.role}HPBar .progress`).attr('title',`HP ${opponent.currHP}/${opponent.maxHP}`);
              let hpPercentage=(opponent.currHP/opponent.maxHP)*100;
              $(`.${opponent.role}HPBar .progress-bar`).css('width', `${hpPercentage}%`);
              battleUpdate(opponent.role,`-${dmg}`);
            }else{
              $('.battleLog').prepend(`${opponent.name} thinks ${this.name} has cotton mouth<br>`);
              battleUpdate(opponent.role,'Fail');
            }
          }else{
            $('.battleLog').prepend(`${opponent.name} dodged ${this.name}'s spit attack<br>`);
            battleUpdate(opponent.role,'Missed');
          }
        }//end cast
      },//end spit
      swoop:{
        name: 'Swoop',
        lvl:4,
        details: 'can only be blocked by opponents with swoop',
        cast: function(opponent){
          //check to see if opponent has flying or reach if not then dmg goes unchallenged-THX MTG for flying
          let dmg,toHit,toDodge;
          let toHitRoll=rollDice();
          if(opponent.abilities.hasOwnProperty('swoop')){
            toHit=toHitRoll+this.agi;
            toDodge=rollDice()+opponent.agi;
          }else{
            toHit=1;
            toDodge=0;
          }
          if(toHit>=toDodge){
            if(toHitRoll>18){
              dmg=Math.floor(this.str*0.75);
            }else{
              dmg=Math.floor(this.str/2);
            }
            if(dmg>0){
              $('.battleLog').prepend(`${this.name}'s swoop dealt ${dmg} damage to ${opponent.name}<br>`);
              opponent.currHP-=dmg;
              $(`.${opponent.role}CurrHP`).text(opponent.currHP);
              $(`.${opponent.role}HPBar .progress`).attr('title',`HP ${opponent.currHP}/${opponent.maxHP}`);
              let hpPercentage=(opponent.currHP/opponent.maxHP)*100;
              $(`.${opponent.role}HPBar .progress-bar`).css('width', `${hpPercentage}%`);
              battleUpdate(opponent.role,`-${dmg}`);
            }else{
              $('.battleLog').prepend(`${this.name} gave ${opponent.name} a winged caress<br>`);
              battleUpdate(opponent.role,'Fail');
            }
          }else{
            $('.battleLog').prepend(`${opponent.name} dodged ${this.name}'s swoop attack<br>`);
            battleUpdate(opponent.role,'Fail');
          }
        }//end cast
      },//end swoop
      swipe:{
        name: 'Swipe',
        lvl:5,
        details: 'damage your enemies with your mighty tail',
        cast: function(opponent){
          let dmg;
          let toHitRoll=rollDice();
          let toHit=toHitRoll+this.agi;
          let toDodge=rollDice()+opponent.agi;
          if(toHit>=toDodge){
            if(toHitRoll>18){
              dmg=Math.floor(this.str*0.75);
            }else{
              dmg=Math.floor(this.str/2);
            }
            if(dmg>0){
              $('.battleLog').prepend(`${this.name}'s swipe dealt ${dmg} damage to ${opponent.name}<br>`);
              opponent.currHP-=dmg;
              $(`.${opponent.role}CurrHP`).text(opponent.currHP);
              $(`.${opponent.role}HPBar .progress`).attr('title',`HP ${opponent.currHP}/${opponent.maxHP}`);
              let hpPercentage=(opponent.currHP/opponent.maxHP)*100;
              $(`.${opponent.role}HPBar .progress-bar`).css('width', `${hpPercentage}%`);
              battleUpdate(opponent.role,`-${dmg}`);
            }else{
              $('.battleLog').prepend(`${this.name} gave ${opponent.name} a twerking lesson<br>`);
              battleUpdate(opponent.role,'Fail');
            }
          }else{
            $('.battleLog').prepend(`${opponent.name} dodged ${this.name}'s tail swipe<br>`);
            battleUpdate(opponent.role,'Fail');
          }
        }//end cast
      }//end swoop
    },//end abilities
    spells:{
      dragonBreath:{
        name: 'Dragon Breath',
        lvl:1,
        details: `allows you to assault your enemy's olfactory senses`,
        castingCost: 3,
        cast:function(opponent){
          if(Lessons.spells.dragonBreath.castingCost>this.currMP){
            if(this.role==='Hero'){
              noticeQ.push(`${this.name} does not have sufficient MP to cast Dragon Breath`);
            }
            return false;
          }else{
            this.updateStat(this.currMP-Lessons.spells.dragonBreath.castingCost,'currMP');
            let dmg;
            let toHitRoll=rollDice();
            let toHit=toHitRoll+this.int;
            let toDodge=rollDice()+opponent.int;
            if(toHit>=toDodge){
              if(toHitRoll>18){
                dmg=Math.floor(this.per*1.25);
              }else{
                dmg=this.per;
              }
              if(dmg>0){
                $('.battleLog').prepend(`${this.name}'s breath did ${dmg} to ${opponent.name}<br>`);
                opponent.updateStat(opponent.currHP-dmg,'currHP');
                battleUpdate(opponent.role,`-${dmg}`);
              }else{
                $('.battleLog').prepend(`${opponent.name} thinks ${this.name}'s breath is minty fresh<br>`);
                battleUpdate(opponent.role,`Failed`);
              }
            }else{
              $('.battleLog').prepend(`${opponent.name} dodged ${this.name}'s dragon's breath<br>`);
              battleUpdate(opponent.role,`Missed`);
            }
            return true;
          }
        }//end cast
      },//end dragonBreath
      simpleHealing:{
        name: 'Simple Healing',
        lvl:2,
        details: 'restores 30% of your HP',
        castingCost:5,
        cast:function(){
          let prevHP=this.currHP;
          if(Lessons.spells.simpleHealing.castingCost>this.currMP){
            if(this.role==='Hero'){
              noticeQ.push(`${this.name} does not have sufficient MP to cast Simple Healing`);
            }//end if
            return false;
          }else if(this.currHP===this.maxHP){
            if(this.role==='Hero'){
              noticeQ.push(`${this.name} has maximum health`);
            }//end if
            return false;
          }else{
            this.updateStat(this.currMP-Lessons.spells.simpleHealing.castingCost,'currMP');
            let healing=Math.floor(this.maxHP*0.3)+prevHP;
            if(healing>this.maxHP){
              healing=this.maxHP;
            }//end if
            this.updateStat(healing,'currHP');
            $('.battleLog').prepend(`${this.name} cast Simple Healing and gained ${healing-prevHP} HP<br>`);
            battleUpdate(this.role,`+${healing-prevHP}`);
            return true;
          }//end if
        }//end cast
      },//end Simple Healing
      simpleSpell:{
        name: 'Simple Spell',
        lvl:3,
        details: `damage done to your enemy based on your perception`,
        castingCost: 7,
        cast:function(opponent){
          if(Lessons.spells.simpleSpell.castingCost>this.currMP){
            if(this.role==='Hero'){
              noticeQ.push(`${this.name} does not have sufficient MP to cast Simple Spell`);
            }
            return false;
          }else{
            this.updateStat(this.currMP-Lessons.spells.simpleSpell.castingCost,'currMP');
            let dmg;
            let toHitRoll=rollDice();
            let toHit=toHitRoll+this.int;
            let toDodge=rollDice()+opponent.int;
            if(toHit>=toDodge){
              if(toHitRoll>18){
                dmg=Math.floor(this.per*1.25);
              }else{
                dmg=this.per;
              }
              if(dmg>0){
                $('.battleLog').prepend(`${this.name}'s simple spell did ${dmg} to ${opponent.name}<br>`);
                opponent.updateStat(opponent.currHP-dmg,'currHP');
                battleUpdate(opponent.role,`-${dmg}`);
              }else{
                $('.battleLog').prepend(`${opponent.name} thinks ${this.name}'s Simple Spell is like a glitter bomb... cute<br>`);
                battleUpdate(opponent.role,`Failed`);
              }
            }else{
              $('.battleLog').prepend(`${opponent.name} dodged ${this.name}'s Simple Spell<br>`);
              battleUpdate(opponent.role,`Missed`);
            }
            return true;
          }
        }//end cast
      },//end simpleSpell
      manaBlast:{
        name: 'Mana Blast',
        lvl:4,
        details: `damage your with your magical powers`,
        castingCost: 10,
        cast:function(opponent){
          if(Lessons.spells.manaBlast.castingCost>this.currMP){
            if(this.role==='Hero'){
              noticeQ.push(`${this.name} does not have sufficient MP to cast Mana Blast`);
            }
            return false;
          }else{
            this.updateStat(this.currMP-Lessons.spells.manaBlast.castingCost,'currMP');
            let dmg;
            let toHitRoll=rollDice();
            let toHit=toHitRoll+this.int;
            let toDodge=rollDice()+opponent.int;
            if(toHit>=toDodge){
              if(toHitRoll>18){
                dmg=Math.floor(this.per*1.75);
              }else{
                dmg=this.per;
              }
              if(dmg>0){
                $('.battleLog').prepend(`${this.name}'s mana blast did ${dmg} to ${opponent.name}<br>`);
                opponent.updateStat(opponent.currHP-dmg,'currHP');
                battleUpdate(opponent.role,`-${dmg}`);
              }else{
                $('.battleLog').prepend(`${opponent.name} thinks ${this.name}'s Mana Blast is like a rainbows and butterflies<br>`);
                battleUpdate(opponent.role,`Failed`);
              }
            }else{
              $('.battleLog').prepend(`${opponent.name} dodged ${this.name}'s Mana Blast<br>`);
              battleUpdate(opponent.role,`Missed`);
            }
            return true;
          }
        }//end cast
      },//end manaBlast
      spellofSages:{
        name: 'Spell of Sages',
        lvl:5,
        details: `call upon the ancient ones to damage your opponent`,
        castingCost: 15,
        cast:function(opponent){
          if(Lessons.spells.spellofSages.castingCost>this.currMP){
            if(this.role==='Hero'){
              noticeQ.push(`${this.name} does not have sufficient MP to cast Spell of Sages`);
            }
            return false;
          }else{
            this.updateStat(this.currMP-Lessons.spells.spellofSages.castingCost,'currMP');
            let dmg;
            let toHitRoll=rollDice();
            let toHit=toHitRoll+this.int;
            let toDodge=rollDice()+opponent.int;
            if(toHit>=toDodge){
              if(toHitRoll>18){
                dmg=Math.floor(this.per*2);
              }else{
                dmg=this.per;
              }
              if(dmg>0){
                $('.battleLog').prepend(`${this.name}'s Spell of Sages did ${dmg} to ${opponent.name}<br>`);
                opponent.updateStat(opponent.currHP-dmg,'currHP');
                battleUpdate(opponent.role,`-${dmg}`);
              }else{
                $('.battleLog').prepend(`${opponent.name} thinks ${this.name}'s Spell of Sages is cute as girls playing with a ouji board<br>`);
                battleUpdate(opponent.role,`Failed`);
              }
            }else{
              $('.battleLog').prepend(`${opponent.name} dodged ${this.name}'s Spell of Sages<br>`);
              battleUpdate(opponent.role,`Missed`);
            }
            return true;
          }
        }//end cast
      },//end spell of sages
    }//end spells
  };//end Lessons

  //show only welcome
  $('.screen').hide();
  $('.introPage').hide();
  $('.endPage').hide();
  $('.rune').hide();
  $('.battleUpdate').hide();
  $('.finalBoss').hide();
  $('.finalBossName').text(Enemies.finalBoss.name);
  if(localStorage.DWCharacter===undefined){
    $('#continueGame').hide();
  }//end if ch in local storage display continue btn
    
  //======================================
  // CLICK EVENTS
  //======================================
  
  $('#newGame').click(function(){
    if(localStorage.DWCharacter===undefined){
      changeScreen('welcome','createDragon');
    }else{
      notify(`Creating a new dragon will delete exsisting game.<br>Would you like to continue?<br><a id="overwrite" href="#" class="btn btn-outline-light mr-5 mt-3">Yes</a><a id="noOverwrite" href="#" class="btn btn-outline-light mt-3">No<a>`);
      $(`#overwrite`)
      .click(function(e){
        e.preventDefault();
        localStorage.removeItem('DWCharacter');
        $('.notice').hide();
        forceFieldSet(false);
        changeScreen('welcome','createDragon');
      });
      $(`#noOverwrite`)
      .click(function(e){
        e.preventDefault();
        $('.notice').hide();
        forceFieldSet(false);
      });
    }//end if
  });//end newGame click event
  
  $('#continueGame').click(function(){
    continueGame();
    changeScreen('welcome','nest');
  });//end continueGame click event

  $('.nameDragon').on('keypress blur',function(){
    if(($('.nameDragon').val().length>0)&&($('.elSelected').length>0)){
      $('.createBtn')
        .css('color','#ffd745')
        .addClass('pulsing');
    }else{
      $('.createBtn')
        .css('color','#deb516')
        .removeClass('pulsing');
    }
  });//end nameDragon keypress blur event
  
  $('.el').hover(function(){
    let elem=$(this).attr('value');
    switch(elem){
      case('fire'):
        $('.statsPreview .str').text(3);
        $('.statsPreview .agi').text(3);
        $('.statsPreview .int').text(2);
        $('.statsPreview .per').text(2);
        break;
      case('rock'):
        $('.statsPreview .str').text(4);
        $('.statsPreview .agi').text(1);
        $('.statsPreview .int').text(3);
        $('.statsPreview .per').text(2);
        break;
      case('water'):
        $('.statsPreview .str').text(3);
        $('.statsPreview .agi').text(2);
        $('.statsPreview .int').text(4);
        $('.statsPreview .per').text(1);
        break;
      case('air'):
        $('.statsPreview .str').text(1);
        $('.statsPreview .agi').text(4);
        $('.statsPreview .int').text(3);
        $('.statsPreview .per').text(2);
        break;
    }
  });
  
  $('.el').on('click', function(e){
    e.preventDefault();
    $('.elSelected').removeClass('elSelected');
    $(this).addClass(' elSelected');
    if(($('.nameDragon').val().length>0)&&($('.elSelected').length>0)){
      $('.createBtn')
      .css('color','#ffd745')
      .addClass('pulsing');
    }
  });//end select element click event
  
  $('.createBtn').click(function(e){
    e.preventDefault();
    if($('.nameDragon').val().length===0){
      notify(`Please enter a name`);
    }else if($('.elSelected').length===0){
      notify(`Please select an element`);
    }else{
      Hero=new GoodGuy($('.nameDragon').val(),$('.elSelected').attr('value'));
      //set Hero img based on element
      switch(Hero.element){
        case "fire":
          Hero.image="assets/fireDragon.png";
          break;
        case "water":
          Hero.image="assets/waterDragon.png";
          break;
        case "rock":
          Hero.image="assets/rockDragon.png";
          break;
        case "air":
          Hero.image="assets/airDragon.png";
      }
      //update hero's stats based on element
      Hero.updateAllStats();
      Hero.gainXP(0);
      //initiate and display intro
      questElements();
      changeScreen('createDragon','intro');
      storytelling('introPage','intro',0);
    }
  });//end createBtn click event

  $('.intro .skipSlideShowBtn').click(function(){
    changeScreen('intro','nest');
    notify(`Ah ${Hero.name}! The elders were looking for you. You should talk to them.`);
  });//end intro button click event
  
  $('.end .skipSlideShowBtn').click(function(){
    changeScreen('end','thx4testing');
    let pauseForCredits=setTimeout(function(){
      changeScreen('thx4testing','welcome');
    },20000);
  });//end end button click event
  
  $('.elder1').click(function(){
    eldersLessons('abilities');
    if(Hero.plantsEaten===0){
      noticeQ.push(`When you level up, hover over plant and eat one to adjust attributes`);
    }
    notify();
  });//end elder1 click event
  
  $('.elder2').click(function(){
    eldersLessons('spells');
    if(Hero.runesCollected.indexOf(Hero.element)<0){
      noticeQ.push(`Also, here is the sacred ${Hero.element} rune.`,`Hurry and collect the others to defeat ${Enemies.finalBoss.name}`);
      Hero.runesCollected.push(Hero.element);
      $(`.rune${Hero.element}`).fadeIn('slow');
    }
    notify();
  });//end elder2 click event
  
  $('.plant').click(function(){
    let plant=$(this).text().trim();
    let attr=Plants[plant].increases;
    if(Hero.plantsEaten<Hero.lvl){
      Hero.plantsEaten+=1;
      //increase hero's stats based on plant type
      Hero.updateStat(Hero[attr]+=1,attr);
      notify(`${Hero.name} ate the ${plant}.<br>and gained 1 ${attr.toUpperCase()}`);
      //update plants with tooltips that reflect what they restore
      plantTooltips();
    }else{
      if(attr==='agi'||attr==='str'){
        if(Hero.currHP===Hero.maxHP){
          notify(`${Hero.name} is not hungry right now`);
        }else{
          Hero.fullHeal();
          notify(`${Hero.name} was healed after eating the ${plant}`);
        }
      }else if(attr==='per'||attr==='int'){
        if(Hero.currMP===Hero.maxMP){
          notify(`${Hero.name} is not hungry right now`);
        }else{
          Hero.fullMP();
          notify(`${Hero.name}'s MP was replenished after eating the ${plant}`);
        }//end if
      }//end if
    }//end if
  });//end plant click event
  
  $('.dragonStatsToggle').click(function(){
    if($(this).children('i').attr('class')==='ion-chevron-down'){
      $('.dragonStats').not('.battleScreen').removeClass('d-none');
      $(this).children('i')
        .removeClass('ion-chevron-down')
        .addClass('ion-chevron-up')
        .prev().text('Hide Stats');
    }else{
      $('.dragonStats').not('.battleScreen').addClass('d-none');
      $(this).children('i')
        .removeClass('ion-chevron-up')
        .addClass('ion-chevron-down')
        .prev().text('Show Stats');
    }
  })//end dragonStatsToggle click event
  
  $('.toWorldMapBtn').click(function(){
    if(Object.keys(Hero.abilities).length===0){
      notify(`${Hero.name} should talk to both elders before leaving the nest`);
    }else{
      $(this).closest('.screen').fadeOut('slow');
      $('.worldMap').delay(1000).fadeIn('slow');
    }
  });//end toWorldMapBtn click event
  
  $('.worldMapBtn').not('.finalBoss').click(function(){
    let destination=$(this).val();
    if(destination===Hero.element){
      changeScreen('worldMap','nest');
    }else{
      landPrep(destination);
      changeScreen('worldMap','landScreen');
    }//end if/else
  });//end worldMapBtn click event
  
  $('.enemy').click(function(){
    $('.battleOptions').hide();
    $('.battleOptions').delay(1700).fadeIn();
    if($(this).hasClass('finalBoss')){
      enemyPrep('finalBoss','celestial');
      changeScreen('worldMap','battleScreen');
    }else{
      enemyPrep($(this).find('.characterName').text().toLowerCase(),$('.landScreen h1').text().slice(0,-5));
      changeScreen('landScreen','battleScreen');
    }
  });//end enemy click event
  
  //battleScreen battlelog/battle info tabs
  $('.tabContainer').tabs();
  var hash=location.hash;
  if(hash){
    $('.tabsContainer').tabs('load',hash)
  }//end tab script
  
  $('.save').click(function(){
    saveGame();
    notify('Your progress has been saved');
  });//end save click event
  
  $('.exit').click(function(){
    //compare current game and saved game
    let savedGame=localStorage.DWCharacter;
    let currGame=JSON.stringify(Hero);
    if(savedGame===currGame){
      //refresh page
      window.location.reload();
    }else{
      notify(`Leaving now will result in losing unsaved progress.<br>Are you sure you want to quit?<div class="d-block my-2"><a id="yesQuit" class="btn btn-outline-light" href="#">Yes</a><a id="noQuit" class="btn btn-outline-light ml-4" href="#">No</a></div>`);
      $('#yesQuit').click(function(){
        window.location.reload();
      });//end yesQuit click event
      $('#noQuit').click(function(){
        $('.notice').hide();
        forceFieldSet(false);
      });//end noQuit click event
    }//end if/else
  });//end exit click event
    
  // //---------------------------------Testing
  // Lessons.abilities.wrathOfKhan.lvl=1;
  // Lessons.abilities.hairyCarrie.lvl=1;
  // //---------------------------------Testing
  
});//end on load function