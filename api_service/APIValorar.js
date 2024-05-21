import { getIP } from "../informacion/Constants";
import { userId } from "../informacion/User";

const URL = getIP();

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString(); // Formats the date as 'YYYY-MM-DDTHH:mm:ss.sssZ'
};

export const submitComment = async (id, comment) => {

  const commentData = {
    commentor_id: 9,
    comment: comment,
    date: getCurrentDate()
  };

  try {
    const response = await fetch("http://"+URL+"/users/minorista/"+id +"/comment", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    const data = await response.json();
    console.log(data);
    console.log("va")
    if (!response.ok) {
        console.log("peta");
        throw new Error('Something went wrong');
    }else{
        console.log('Product added successfully:', data); 
    }
    }catch (error) {
      console.log("NO VA COMMENT");
      console.log(error.message);
    }
}

export const submitRating = async(id, stars) => {

  const rateData = {
    stars: stars
  };

  try {
    //console.log("llega este rating: " + stars )
    //console.log("http://"+URL+"/users/minorista/rating/"+id);

    const response = await fetch("http://"+URL+"/users/minorista/rating/"+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rateData),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        console.log("peta");
        throw new Error('Something went wrong');
    }else{
        console.log('Product added successfully:', data);    
    }
    }catch (error) {
        console.log("NO VA RATING");
        console.log(error.message);
    }
}