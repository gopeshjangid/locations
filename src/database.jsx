var indexedDB		= window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
	IDBTransaction  = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
	baseName 	    = "DB",
    storeName 	    = "locations",
    timeStoreName = 'time';

function logerr(err){
	console.log(err);
}

function connectDB(f){
	var request = indexedDB.open(baseName, 1);
	request.onerror = logerr;
	request.onsuccess = function(){
		f(request.result);
	}
	request.onupgradeneeded = function(e){
		var Db = e.currentTarget.result;//var Db = e.target.result;
		if(!Db.objectStoreNames.contains(storeName)) {
            var store = Db.createObjectStore(storeName, {keyPath: "id", autoIncrement:true});
        }
        console.log("checking" ,Db.objectStoreNames.contains(timeStoreName))
        if(!Db.objectStoreNames.contains(timeStoreName)) {
            var time = Db.createObjectStore(timeStoreName);  
		}
		connectDB(f);
	}
}


export const  get =(id,f)=>{
	connectDB(function(db){
		var transaction = db.transaction([storeName], "readonly").objectStore(storeName).get(parseInt(id));
		transaction.onerror = logerr;
		transaction.onsuccess = function(){
            console.log("result===",transaction.result)
			f(transaction.result ? transaction.result : -1);
		}
	});
}

export const  getAll=(f)=>{
	connectDB(function(db){
		var rows = [],
			store = db.transaction([storeName], "readonly").objectStore(storeName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				f(e.target.result);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					f(rows);
				}
			};
	});
}
export const  getAllTime=(f)=>{
	connectDB(function(db){
		var rows = [],
			store = db.transaction([timeStoreName], "readonly").objectStore(timeStoreName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				f(e.target.result);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					f(rows);
				}
			};
	});
}

export const update=(obj,f)=>{//obj with id
	del(obj.id);
    save(obj,f);
    return true;
}

export const save= (obj,f)=>{
	connectDB(function(db){
		var transaction = db.transaction([storeName], "readwrite");
		var objectStore = transaction.objectStore(storeName);
		var objectStoreRequest = objectStore.add(obj);
		objectStoreRequest.onerror = function(){
            f(false);
        }
		objectStoreRequest.onsuccess = function(){
            if(f){
                f(true);
            }
			
		}
    });
    return false;
}

export const saveTime= (obj,f)=>{
    if(obj.id==0){
        deleteTime(obj.id ,'');
    }else {

    }
    
	connectDB(function(db){
        console.log("------------",db)
		var transaction = db.transaction([timeStoreName], "readwrite");
		var objectStore = transaction.objectStore(timeStoreName);
		var objectStoreRequest = objectStore.add(obj);
		objectStoreRequest.onerror = function(){
            f(false);
        }
		objectStoreRequest.onsuccess = function(){
            if(f){
                f(true);
            }
			
		}
    });
    return false;
}

export const del = (id,f)=>{
	connectDB(function(db){
		var transaction = db.transaction([storeName], "readwrite");
		var objectStore = transaction.objectStore(storeName);
		var objectStoreRequest = objectStore.delete(id);
		objectStoreRequest.onerror = logerr;
		objectStoreRequest.onsuccess = function(){
			 if(f) {
                f(true)
             }
                
		}
	});
}
export const deleteTime = (id,f)=>{
	connectDB(function(db){
		var transaction = db.transaction([timeStoreName], "readwrite");
		var objectStore = transaction.objectStore(timeStoreName);
		var objectStoreRequest = objectStore.delete(id);
		objectStoreRequest.onerror = logerr;
		objectStoreRequest.onsuccess = function(){
			 if(f) {
                f(true)
             }
                
		}
	});
}
