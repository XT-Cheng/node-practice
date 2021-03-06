import { normalize, schema, denormalize } from 'normalizr';

const originalData = {
    id: "123",
    author: {
      id: "1",
      name: "Paul"
    },
    title: "My awesome blog post",
    comments: [
      {
        id: "324",
        commenter: {
          id: "2",
          name: "Nicole"
        }
      }
    ]
  };

// Define a users schema
const user = new schema.Entity('users');

// Define your comments schema
const comment = new schema.Entity('comments', {
  commenter: user
});

// Define your article 
const article = new schema.Entity('articles', { 
  author: user,
  comments: [ comment ]
});

const normalizedData = normalize(originalData, article);
//const denormalizedData = denormalize(normalizedData.result,user,normalizedData.entities);
const denormalizedData = denormalize({ users: [ 2 ] },{ users: [ user ] },normalizedData.entities);
export class Test {
  data : any;
  deData: any;
  constructor() {
    this.data = normalizedData;
    this.deData  = denormalizedData;
  }
}