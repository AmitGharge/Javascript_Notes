const retryCount = 3;
const delay = 2000;

const apiMock = (args) => {
  return new Promise((resolve, reject)=> {
      const mockObj= {
        id: 1,
        name: "Akshay Chavan",
        phNumber: "1234123412",
        address: "Ugar Khurd"
      }
      if(args.id === mockObj.id ) resolve(mockObj);
      else reject(`No User Exists with the specified ID:${args.id}`);
  })
}

const retry = (callback, retries, delay) => {
  return new Promise((resolve,reject)=> {
    callback()
    .then((result)=> {
      resolve(result);  
    })
    .catch((error)=> {
      if(retries > 0) 
        setTimeout(function() {
          console.log(`Retry: ${retries}`);
          retry(callback,retries-1, delay)
          .then(result => resolve(resolve))
          .catch(reject);
        }, delay);
      else {
        //retry = 3;
        reject(`Failed after retries:${error}`);
    }      
    })
  })
}

retry(()=> apiMock({id: 2}),retryCount, delay)
.then((result)=> {
  console.log(result);
}).catch((err)=> {
  console.log(err);
})