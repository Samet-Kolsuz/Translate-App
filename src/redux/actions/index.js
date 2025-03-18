import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api"

const getLanguages = createAsyncThunk("language/getLanguages", 
    async()=>{
        // api den dil verilerini al

const res = await api.get("/getLanguages");
        // aldigi verileri payload olarak belirle
        return res.data.data.languages;
    })

export default getLanguages;


export const translateText = createAsyncThunk(
    "translate/translateText",
     async(arg, {getState})=> {
        // aksiyon icindeki storea abone olmaya yarar
        const {translate} = getState();

    // apia ya gonderilecek paramslari belirle
    const params = new URLSearchParams();
    params.set("source_language", translate.sourceLang.value);
    params.set("target_language", translate.targetLang.value);
    params.set("text", translate.textToTranslate);



    // api a istk at
    const res =  await api.post("/translate", params);



    //aldigi metni payload olarak cevir
    return res.data.data.translatedText;
})