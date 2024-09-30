import "./CreateNewRequest.css";
import { useState } from "react";

function CreateNewRequest({ onCreate }){
    const [request, setRequest] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        setRequest(null);
        onCreate(request);
    };

    return (
        <form onSubmit={submit} className="new-request-form">
            <h1>Создание заявки</h1>
            <label>Заголовок</label>
            <input 
                placeholder="Заголовок"
                onChange={(e) => setRequest({...request, title: e.target.value })}/>
            <label>Категория</label>    
            <select
                placeholder="Категория"
                onChange={(e) => setRequest({...request, issueType: e.target.value })}>
                    <option>Программа</option>
                    <option>Компьютер/тонкий клиент</option>
                    <option>Принтер</option>
                    <option>Проблема с доступом/утеря логина или пароля</option>
                    <option>Прочее</option>
                </select>
            <label>Приоритет</label> 
            <select 
                placeholder="Приоритет"
                onChange={(e) => setRequest({...request, priority: e.target.value })}>
                    <option>очень срочно</option>
                    <option>срочно</option>                
            </select>
            <label>Описание</label>
            <textarea 
                placeholder="Описание"
                onChange={(e) => setRequest({...request, description: e.target.value })}/>
            <button type="submit" color="blue">Создать заявку</button>
        </form>


        // <form onSubmit={submit} className="new-request-form">
        //     <h1>Создание заявки</h1>
        //     <input 
        //         placeholder="UserId" 
        //         onChange={(e) => setRequest({...request, userId: e.target.value })}/>
        //     <input
        //         placeholder="Тип проблемы"
        //         onChange={(e) => setRequest({...request, issueType: e.target.value })}/>
        //     <input 
        //         placeholder="Приоритет"
        //         onChange={(e) => setRequest({...request, priority: e.target.value })}/>
        //     <input 
        //         placeholder="Заголовок"
        //         onChange={(e) => setRequest({...request, title: e.target.value })}/>
        //     <textarea 
        //         placeholder="Описание"
        //         onChange={(e) => setRequest({...request, description: e.target.value })}/>
        //     <button type="submit" color="blue">Создать</button>
        // </form>
    );
}

export default CreateNewRequest;