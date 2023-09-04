import { LightningElement } from 'lwc';

// importing the css static resource file for fonts
import fontawesome from '@salesforce/resourceUrl/fontawesome'

//importing loadStyle method from resource 
import {loadStyle} from 'lightning/platformResourceLoader'

export default class MemoryGameLWC extends LightningElement {

    //to prevent re-rendering of the library everytime
    isLibLoaded = false
    // array to check and regulate that only 2 cards can be opened at once
    openedCards = []
    // moves to count the number of moves
    moves = 0
    // to store matched cards
    matchCard = []
    // timer for the game
    totalTime = '00:00'
    //taking the refrence of timer so that we can stop it as soon as the entire game completes
    timerReference
    // congrats on completing the game
    showCongratulations = false

    // creating an array of card-icon objects 2 copies of 1 card
    cards=[
        {id:1, listClass:"card", type:'diamond', icon:'fa fa-diamond'},
        {id:2, listClass:"card", type:'plane', icon:'fa fa-paper-plane-o'},
        {id:3, listClass:"card", type:'anchor', icon:'fa fa-anchor'},
        {id:4, listClass:"card", type:'bolt', icon:'fa fa-bolt'},
        {id:5, listClass:"card", type:'cube', icon:'fa fa-cube'},
        {id:6, listClass:"card", type:'anchor', icon:'fa fa-anchor'},
        {id:7, listClass:"card", type:'leaf', icon:'fa fa-leaf'},
        {id:8, listClass:"card", type:'bicycle', icon:'fa fa-bicycle'},
        {id:9, listClass:"card", type:'diamond', icon:'fa fa-diamond'},
        {id:10, listClass:"card", type:'bomb', icon:'fa fa-bomb'},
        {id:11, listClass:"card", type:'leaf', icon:'fa fa-leaf'},
        {id:12, listClass:"card", type:'bomb', icon:'fa fa-bomb'},
        {id:13, listClass:"card", type:'bolt', icon:'fa fa-bolt'},
        {id:14, listClass:"card", type:'bicycle', icon:'fa fa-bicycle'},
        {id:15, listClass:"card", type:'plane', icon:'fa fa-paper-plane-o'},
        {id:16, listClass:"card", type:'cube', icon:'fa fa-cube'},
    ]

    // give player rating according to the moves
    get gameRating(){
        // when move are 12 or less assign the array[1,2,3] when in range 13-16 assign [1,2] else give [1] for 1 star
        let stars =  this.moves <= 12 ? [1,2,3]: this.moves >= 13 && this.moves<=16 ? [1,2]:[1]
        // when the entrie game is completed i.e matched cards become 16 then return star variable else return empty
        return this.matchCard.length === 16 ? stars : []
      }

    // after clicking a card
    displayCard(event){
        //get the value in the card
        let currentCard = event.target
        // add these classes to the target that was clicked
        currentCard.classList.add("open","show","disabled")
        // pushing the clicked card into an array we can also use push and pop methods but not good from the immutability principle
        this.openedCards = this.openedCards.concat(event.target)
        const len = this.openedCards.length
        if(len === 2){
            // when 2 cards have been clicked then increase move
            this.moves = this.moves+1

            // start the timer from the first move
            if(this.moves === 1){
                this.timer()
            }

            // now check if the two cards match
            if(this.openedCards[0].type === this.openedCards[1].type){
                //if the cards match put them into match cards array
                 this.matchCard = this.matchCard.concat(this.openedCards[0],this.openedCards[1])
                 this.matched()
            }
            // if the two picked cards donot match
            else{
                this.unmatched()
            }
        }
    }

    // if matched change some CSS
    matched(){
        this.openedCards[0].classList.add('match','disabled')
        this.openedCards[1].classList.add('match','disabled')
        this.openedCards[0].classList.remove('show','open')
        this.openedCards[1].classList.remove('show','open')
        // then reset the openCards so more can be selected
        this.openedCards =[]
        // once all the cards have been matched stop the timer
        if(this.matchCard.length === 16){
            // JS native property
            window.clearInterval(this.timerReference)
            this.showCongratulations = true
        }
    }
    // if unmatched change another CSS
    unmatched(){
        // add unamtched CSS to show the user
        this.openedCards[0].classList.add('unmatched')
        this.openedCards[1].classList.add('unmatched')

        // now we also want to prevent the user from clicking other cards once the 2 cards unmatch for sometime
        this.action('DISABLE')


        // then remove the CSS so that user can check the card for someother combination i.e remove it showing and opening and also unamrk as unmatched
        //basically flip the cards back after incorrect matching
        setTimeout(()=>{
            this.openedCards[0].classList.remove('show','open','unmatched')
            this.openedCards[1].classList.remove('show','open','unmatched')

            // after sometime enable the clicking again
            this.action('ENABLE')

            // again reset the open cards so more can be selected
            this.openedCards =[]

        },1100)
    }

    action(action){
        // getting all available cards
        let cards = this.template.querySelectorAll('.card')
        // converting the NodeList retruned above to a proper Array and then running loop
        Array.from(cards).forEach(item => {
            if(action === 'ENABLE'){
                // check if the card has a match class or not then donot do anything
                // get list of all matched cards
                let isMatch = item.classList.contains('match')
                // then set not matched cards to be clickable by removing disabled from them
                if(!isMatch){
                    item.classList.remove('disabled')
                }
            }
            // if the action DISABLED then mark the cards as not possible for clicking
            if(action === 'DISABLE'){
                item.classList.add('disabled')
            }
        })

    }

    // timer for the game
    timer(){
        // create new instance for Date Object
        let startTime = new Date()
        // keep counting at an interval of 1 secons
        this.timerReference = setInterval(()=>{
            // currentTime-Time that we started
            let diff = new Date().getTime() - startTime.getTime()
            let d = Math.floor(diff/1000)
            const m = Math.floor(d % 3600 / 60);
            const s = Math.floor(d % 3600 % 60);
            // to display minute/minutes and also seconds according to the number like if >1 then plural else singular
            const mDisplay = m>0 ? m+(m===1? "minute, ":" minutes, "):""
            const sDisplay = s>0 ? s+(s===1? "second":" seconds"):""
            this.totalTime = mDisplay + sDisplay
        }, 1000)
    }

    // reset everything
    shuffle(){
        this.showCongratulations = false
        this.openedCards = []
        this.moves = 0
        this.matchCard = []
        this.totalTime = '00:00'
        window.clearInterval(this.timerReference)
        // also remove all the classes added to the cards
        let elem = this.template.querySelectorAll('.card')
        Array.from(elem).forEach(item=>{
            // not removing unamtched because after sometime it is anyway gonna be removed
            item.classList.remove('show', 'open', 'match','disabled')
        })

        // also change the order of the cards
        // taking copy of the cards first
        let array = [...this.cards]
        // to restrict randoming the values to 16 and below
        let counter = array.length

        while(counter>0){
            // getting a random index
            let index = Math.floor(Math.random()*counter)
            // so next time it restricts randoming the values to 15 and below and so forth
            counter--

            // meanwhile swap the cards
            let temp = array[counter]
            array[counter] = array[index]
            array[index] = temp
        }

        // after swapping has been done put these cards into the main cards array
        this.cards = [...array]
    }    

    //LCH to make sure that the css is loaded only after the HTML content is rendered
    renderedCallback(){
        // if already loaded
        if(this.isLibLoaded){
            return
        }
        else{
            // loadStyle(context reference,fileUrl)
            //remember loadStyle is asynchronous and thus a Promise call
            loadStyle(this,fontawesome+'/fontawesome/css/font-awesome.min.css').then(()=>{
            console.log("loaded successfully")
            }).catch(error=>{
                console.error(error)
            })
            this.isLibLoaded = true
        }
    }
}