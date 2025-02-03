const getCookiesFromArray = (cookie_array)=>{

    let cookie_ans = "";
    const cks = Array.from(cookie_array);
    let ans_arr = [];
    cks.map((val)=>{
        ans_arr.push(val.split(';')[0]);
    });
    ans_arr.sort();
    
    ans_arr.map((val)=>{
        cookie_ans += val+"; ";
    })
    cookie_ans = cookie_ans.slice(0,-2);
    return cookie_ans
}

module.exports = {getCookiesFromArray};