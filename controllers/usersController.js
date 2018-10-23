/* data structure algorythm like an array, object
linked lists and the population of nodes
one class will generate list itself = .head the first node in the list- continuous chain and it would have different 
methods - our comps are doing this behind the scenes
class linkedlist{
    constructor(){
        this.head=null; <pointer to what it thinks the first node will be
    }
};
class node{
    constructor(data){
        this.next=null; <points to next in list
        this.data=data;
    }
};
//this.head refers to the first node in the list this.head.next()
the whole point is for the nodes to hold data
first method we might add is the ability to add a node
linkedlist.prototype.addNode(data){
    const newNode = new Node(data); <new keyword and node class
    if(!this.head){ //if this.head doesn't exist, because it's null in the constructor, the first time we add a node there isn't a head
        this.head=newNode;
        return this;
    }else{
        //new one gets added to the back so check for a next property only the nodes inside the chain have a next property
        //each node points to the next one, when we add the 2nd node, it should appear and the one before
        //should point to it
        let runner = this.head; //if we have a node that's this.next=null
        while(runner.next){
            runner = walker.next
        }
        walker.next=newNode;
    }
}

if im' adding a node to a new one we're creating the very first one in the list
what happens if I add a second one
how do i compute the length of linkedlist?

linkedlist.prototype.search = function(data){
    //look through the list
}

.populate you want to pass in the document user id
user name of the review a review has a user
when you make a review drop down menu for the user to review
show route ejs reviews new
reviews index reviews.find({}).populate("Users") in the route
reviews[i].users

sessions are stored in browser memory
connect mongodb-session npm i connect-mongodb-session - could we store those sessions in the db, so when we reset it doesn't die
in server js
var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var app = express();
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/mongotest', <a variable that's stored 
  collection: 'mySessions'
});
store.on('connected', function() {
  store.client; // The underlying MongoClient object from the MongoDB driver
});
 
// Catch errors
store.on('error', function(error) {
console.log(error); <
});
 //this storing of our sessions has a lot more we can use, == can go in app.use(session({...}))
app.use(require('express-session')({
  secret: 'This is a secret',
  ==cookie: {
    ==maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  ==},
  ==store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));
<%-include('partials/_navbar')%>
<% if(typeof user !== "undefined"){%>
    <%} else{ %>
    Welcome back, <%=user.name%>
    <%-include('partials/navbar')
        <a href="/login">Login</a>
        <a href="/users/new">Resiger</a>
    }
*/