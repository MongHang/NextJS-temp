"use client"
import React, {useEffect, useState} from "react";
import {Calendar, Phone, User} from "lucide-react";
import {throttle} from "lodash";
import toast, {Toaster} from "react-hot-toast";




interface forms {
    name: string;
    age: number;
    phone: string;
}

export default function Form() {
    //假想loading

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [inputs, setInputs] = useState<forms[]>([]); // 改為陣列
    // 定義用來暫存單一輸入資料的 state
    const [formInput, setFormInput] = useState<forms>({
        name: "",
        age: 0,
        phone: "",
    });

    const throttledToast = throttle((message: string) => {
        toast.error(message);
    }, 3000);
    // 更新暫存資料的函式
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        window.localStorage.setItem(name, value);
        if (name === "age") {
       if (!/^\d*$/.test(value)) {
           throttledToast("請輸入數字")
           return;
       }
   }
        setFormInput((prev) => ({
            ...prev,
            [name]: name === "age" ? Number(value) : value, // 如果是 age，將值轉為數字
        }));
    };

    // 提交表單的處理函式
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingIndex !== null) {
            // 編輯現有項目
            const newInputs = [...inputs];
            newInputs[editingIndex] = formInput;
            setInputs(newInputs);
            setEditingIndex(null);
        } else {
            // 添加新項目
            setInputs([...inputs, formInput]);
        }

        setFormInput({ name: "", age: 0, phone: "" });
        window.localStorage.setItem("data", JSON.stringify(inputs));
    };
    const handleDel = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {name} = e.target as HTMLButtonElement;
        const index = inputs.findIndex((item) => item.name === name);
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
        window.localStorage.setItem("data", JSON.stringify(newInputs));
    }
    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setFormInput(inputs[index]);
    };
    const loadData = () => {
        const data = window.localStorage.getItem("data");
        if (data) {
            setInputs(JSON.parse(data));
        } else {
            setInputs([]);
        }
    }
        const notify_success = () => toast.success('加載完畢');
        const notify_error =(error: unknown) => toast.error("加載錯誤" + String(error));

        useEffect(() => {
            async function init() {
                setIsLoading(true);
                try {
                    await sleep(3000);
                    loadData();
                    notify_success();
                } catch (error) {
                    notify_error(error);
                } finally {
                    setIsLoading(false);
                }
            }

            init().then(r => console.log(r));
        }, []);
    return (
        <>
            <Toaster/>
            {isLoading ? (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>姓名</th>
                            <th>年齡</th>
                            <th>手機</th>
                            <th> 修改</th>
                            <th> 刪除 ?</th>
                        </tr>
                        </thead>
                        <tbody>
                        {[...Array(4)].map((_, i) => (
                            <tr key={i}>
                                <td className="skeleton  p-6 w-20"></td>
                                <td className="skeleton  p-6"></td>
                                <td className="skeleton  p-6"></td>
                                <td className="skeleton  p-6"></td>
                                <td className="skeleton  p-6"></td>
                                <td className="skeleton  p-6"></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (

                <div className="overflow-x-auto">

                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>姓名</th>
                            <th>年齡</th>
                            <th>手機</th>
                            <th> 修改</th>
                            <th> 刪除 ?</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inputs.map((item: forms, index: number) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <button className="btn btn-accent" onClick={() => handleEdit(index)}>修改</button>
                                </td>
                                <td>
                                    <button className="btn btn-error" name="del" onClick={handleDel}>刪除</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="divider"></div>
            {/* 表單輸入區域 */}
            <div className="card card-bordered p-6"> {/* Add padding around card */}
                <form onSubmit={handleSubmit}
                      className="flex flex-col space-y-4"> {/* Add vertical spacing between items */}

                    <div className="flex items-center gap-2 p-4">
                        <User size={24}/>
                        <input
                            className="input input-bordered flex-1"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formInput.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex items-center gap-2 p-4">
                        <Calendar size={24}/>
                        <input
                            className="input input-bordered flex-1"
                            type="text"
                            name="age"
                            placeholder="Age"
                            value={formInput.age}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex items-center gap-2 p-4">
                        <Phone size={24}/>
                        <input

                            className="input input-bordered flex-1"
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formInput.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn btn-primary p-5 " type="submit">Submit</button>

                </form>
            </div>
        </>
    )
}
