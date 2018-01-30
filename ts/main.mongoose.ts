import { Observable } from 'rxjs/Rx';
import { connect, Schema, Mongoose, Document, model, Model } from 'mongoose';
import { City, CityModel } from './city.model';
import { ObjectID } from 'bson';
import { FilterCategoryModel, FilterCategory } from './filterCategory.model';

export class Server {
    filterCategory: Object;
    ViewPoint: Model<Document>;
    City: Model<Document>;

    constructor() {
        this.filterCategory = {
            id: new ObjectID().toHexString(),
            name: '时间消耗',
            criteries: [{
                id: "cc4b4d6030e1cf2b19b493da",
                name: "1小时以内",
                criteria: ""
            }, {
                id: "cc4b4d6030e1cf2b19b493d9",
                name: "1-2小时",
                criteria: ""
            }]
        };

        //#region Classic mongoose
        var citySchma = new Schema({
            name: String,
            thumbnail: String
        });
        var viewPointCommentSchma = new Schema({
            detail: String,
            user: String,
            avatar: String,
            publishedAt: { type: Date, default: Date.now },
            images: [String],
            rate: Number
        })
        var viewPointSchema = new Schema({
            _id: String,
            name: String,
            city: { type: String, ref: 'city' },
            description: String,
            tips: String,
            timeNeeded: String,
            thumbnail: String,
            address: String,
            latitude: Number,
            longtitude: Number,
            category: Number,
            rank: Number,
            images: [String],
            countOfComments: Number,
            comments: [viewPointCommentSchma]
        })

        this.City = model('city', citySchma);
        this.ViewPoint = model('viewpoint', viewPointSchema);

        //#endregion

        require('mongoose').Promise = global.Promise;
        this.start();
    }

    private async start() {
        await this.connectDb();
        let viewPoint = await this.ViewPoint.findById('5a4912502350c4065c30f6ad').exec();
        let viewPoints = await this.ViewPoint.find({city: '5a4b5756764fba2c80ef5ba1'}).exec();
        //let filterCategory = await this.createFilterCategory();
        let json = viewPoint.toJSON();
        console.log(json);
    }

    private async connectDb() {
        await connect("mongodb://localhost/local");
        console.log("DB Connected!");
    }

    private async createFilterCategory(): Promise<Document & FilterCategory> {
        return FilterCategoryModel.createFilterCategory([this.filterCategory])
    }

    private findFilterCategories(): Observable<FilterCategory[]> {
        return Observable.fromPromise(FilterCategoryModel.findFilterCategories());
    }
}

//#region Classic mongoose
// var childSchma = new Schema({
//     user : String
// },{timestamps: true});
// childSchma.pre('save',(next)=> {
//     console.log('pre save child');
//     next();
// })

// var blogSchema = new Schema({
//     title:  String,
//     author: String,
//     users : [childSchma]
//   },{timestamps: true});

// blogSchema.pre('save',(next)=> {
//     console.log('pre save blog');
//     next();
// })

// export var blogModel = model('blog',blogSchema);
//#endregion