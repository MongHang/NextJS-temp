"use client"
import {useState} from "react";
import {Plus,Minus} from "lucide-react";


interface num {
    num:number;
}



export default function Card({num}:num) {
    const [mystate, setMystate] = useState(num);




    return (
        <>
    <div className="flex items-center gap-4">
      <div className="font-bold text-amber-900 text-2xl">
        {mystate}
      </div>
      <button
        className="flex items-center justify-center bg-amber-950 hover:bg-amber-900 text-amber-50 p-2 rounded-lg transition-colors"
        onClick={() => setMystate(mystate + 1)}
      >
        <Plus size={24} />
      </button>
      <button
        className="flex items-center justify-center bg-amber-950 hover:bg-amber-900 text-amber-50 p-2 rounded-lg transition-colors"
        onClick={() =>  setMystate(mystate - 1)}
      >
        <Minus size={24} />
      </button>
    </div>
            </>
    )




}
