class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options:"i",//Both capital and small case
            }
        } :{};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter (){
        const querycopy = {...this.queryStr}
        //Removing some field for category

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete querycopy[key]);


        //Filter for price and Ratings
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g,key => `$${key}`); //sare greater than and less than wale aa jayege nhi toh accurate price dalna padta

       
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage-1)

        this.query = this.query.limit(resultPerPage).skip(skip);
  

        return this;
    }
}
module.exports = ApiFeatures