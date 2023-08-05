function countTime(time) {
    const createTime = new Date(time);
    const timeNow = new Date();
    const count = new Date(timeNow - createTime);

    if(count.getTime()<5000){
        return "vừa xong";
    }

    if(count.getTime()<60000){
        return count.getUTCSeconds() + " giây trước";
    }

    if(count.getTime()<(60*60*1000)){
        return count.getUTCMinutes() + " phút trước";
    }

    if(count.getTime()<(60*60*24*1000)){
        return count.getUTCHours() + " giờ trước";
    }

    if(count.getTime()<(60*60*24*28*1000)){
        return count.getUTCDate() + " ngày trước";
    }

    if(count.getTime()<(60*60*24*30*12*1000)){
        return (count.getUTCMonth()+1) + " tháng trước";
    }
        
    if(count.getTime()>(60*60*24*30*12*1000)){
        return createTime.getDate() + "/" + (createTime.getMonth()+1) + "/" + createTime.getFullYear();
    }
    // return count.getUTCFullYear().toString()
}

export default countTime;