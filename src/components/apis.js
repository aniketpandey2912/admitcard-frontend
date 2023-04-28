import axios from "axios";

let url = "http://localhost:4500/admitcard/getadmitcard";
export const admitCardApi = async (data) => {
  try {
    let res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
