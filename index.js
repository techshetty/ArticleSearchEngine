const express = require('express')
const app=express()
app.use(express.json())
const port='3000'
const articleList=[]
const getfreq=(key,para)=>{
    const wl=para.split(" ")
    return wl.filter(x=>x==key).length;
    }
    const sortList=(lst)=>{
        var n=lst.length
        for(var i=0;i<n;i++){
            for(var j=i+1;j<n;j++){
                if(lst[i].keyfreq<lst[j].keyfreq){
                    var t=lst[i]
                    lst[i]=lst[j]
                    lst[j]=t
                }
            }
        }
        return lst
    }
app.get('/',(req,res)=>{
    res.send("Article API is running")
})
app.post('/articles',(req,res)=>{
if(req.body.title&&req.body.text&&req.body.id) {articleList.push(req.body);res.status(200).json({"message":"success"})}
else res.status(200).json({"message":"failed. Invalid article format"})
})

app.get('/viewarticles',(req,res)=>{
    return res.status(200).json({"articles": articleList})
    })
    app.get('/getarticle/',(req,res)=>{
        const id=req.query.id
        if(!id) return res.status(404).json("Invalid ID")
            const article = articleList.find(test=>{
                if(test.id==id) return res.status(200).json({"article: ": test})
            })
            res.status(404).json({"error": "article not found"})
        })
        app.get('/search/',(req,res)=>{
            const title=req.query.title
            const text=req.query.key
            if(title) {
                console.log("title")
                const article = articleList.find(test=>{
                    if(test.title==title) return res.status(200).json({"article: ": test})
                })
            }
            else if(text){
                const t=[]
                for(art of articleList){
                    const f1=getfreq(text,art.text)
                    if(f1) t.push({"book": art,"keyfreq": f1})
                }
                return res.status(200).json({"articles: ": sortList(t)})
            }
            return res.status(404).json({"message: ": "failed"})
            })
app.listen(port,()=>{
    console.log(`API running on ${port}`)
})

console.log(getfreq("hello","hello hello"))