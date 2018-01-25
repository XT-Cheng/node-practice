import { Observable } from 'rxjs/Rx';
import { connect, Schema, Mongoose, Document } from 'mongoose';
import { City, CityModel } from './city.model';
import { ObjectID } from 'bson';

export class Server {
    city : Object;
    constructor() {
        this.city = {
            id: new ObjectID().toHexString(),
            name: '上海',
            thumbnail: 'xxx.jpg'
        };
        require('mongoose').Promise = global.Promise;
        this.start();
    }

    private async start() {
        await this.connectDb();
        let city = await this.createCity();
        let json = city.toJSON({virtuals: true});
        console.log(json);
    }

    private async connectDb() {
        await connect("mongodb://localhost/local");
            console.log("DB Connected!");
    }

    private async createCity() : Promise<Document & City> {
        return CityModel.createCity([this.city])
    }

    private findCities() : Observable<City[]> {
        return Observable.fromPromise(CityModel.findCities());
    }
}