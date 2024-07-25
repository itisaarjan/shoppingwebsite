const map=new Map();

function memoizeOne(fn){
    const result=fn(1,2);
    if(result in map){
        return map.get(result);
    }else{
        
    }
}

const add=(a,b)=>a+b;
const memoizedAdd=memoizeOne(add);
console.log(memoizedAdd);