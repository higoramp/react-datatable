
// A Lazy list that fetches data as required by slice method
class LazyDataFetch {

  constructor (urlFetch, processData=(data)=>new Array(...data), order, asc){
    this.urlFetch = urlFetch;
    this.processData= processData;
    this.data = [];
    this.order = order;
    this.asc = asc;
    this.updateList = false;
    this.length=0;
  }
  slice(start, end){

    return new Promise((resolve, reject)=>{
      
      let newStart = this.data.length<start?this.data.length:start;
      if (this.updateList){
          //Discarding the cache and updating the list
          this.data=[];
          this.updateList = false;
          newStart= 0;
      }
      if(end<=this.data.length){
        //Returning  from "cache"
        return resolve(this.data.slice(start, end));
      }else{
        return fetch(`${this.urlFetch}?_start=${newStart}&_end=${end}${this.order?('&_sort='+this.order):''}${this.asc?('&_asc='+this.asc):''}`)
          .then((response) => {
            //Getting the Header with the Total count of results
            this.length=response.headers.get("x-total-count");
            return response.json();})
          .then((users) => {
		    this.data.splice(newStart, (end-newStart), ...this.processData(users));
            return resolve(this.data.slice(start, end));//Returns only what was asked
          })
          .catch(err => {
              console.log('Fetch Error: ', err);
              return reject(err);
          });
      }
    });
    
      
  }
  //Should be used with the slice method
  sort(order, asc){
    if(this.order!=order||this.asc!=asc){
        this.order=order;
        this.asc= asc;
        this.updateList = true; //Just a flag to keep control of what is in "cache"
    }
      
  }

}

export default LazyDataFetch;