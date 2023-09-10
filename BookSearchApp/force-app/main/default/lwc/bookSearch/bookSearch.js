import { LightningElement } from 'lwc';

// importing fonts for rating
import fontawesome from '@salesforce/resourceUrl/fontawesome'

// API link
const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q='
export default class BookSearch extends LightningElement {
    query='Atomic'
    books=[]
    timer

    // need to run it everytime on load
    connectedCallback(){
        this.fetchBookData()
    }
 
    // call to fetch book data
    fetchBookData(){
        // adding search term to URL
        fetch(BOOK_URL+this.query)
        .then(response=>response.json())
        .then(data=>{
            this.books =  data ? this.formatData(data) :[]
            console.log("this.books",  this.books )

        }).catch(error=>console.error(error))
    }

    //getting input value
    fetchBooksHandler(event){
        this.query = event.target.value
        // debouncing so that it loads for all the characters typed within 1 second
        window.clearTimeout(this.timer)
        this.timer= setTimeout(()=>{
            this.fetchBookData()
        }, 1000)
    }

    // averageRating
    formatData(data){
        console.log(data)
        let books =  data.items.map(item=>{
            let id = item.id
            let thumbnail = item.volumeInfo.imageLinks && (item.volumeInfo.imageLinks.smallThumbnail || item.volumeInfo.imageLinks.thumbnail)
            let title = item.volumeInfo.title
            let publishedDate = item.volumeInfo.publishedDate
            let averageRating = item.volumeInfo.averageRating ||'NA'
            return {id, thumbnail, title, publishedDate, averageRating}
        })
        return books
    }

    // get ratings(){
    //     let stars =  this.averageRating === 5 ? [1,2,3,4,5]: 
    //                             this.averageRating === 4 ? [1,2,3,4]: 
    //                                 this.averageRating === 3 ? [1,2,3]:
    //                                    this.averageRating === 2 ? [1,2]:
    //                                        this.averageRating<=1 ? [1]:[]
    //     return stars
    //   }
}


