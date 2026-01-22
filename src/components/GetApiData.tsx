import { useEffect, useState } from "react";

interface apiDataProps {
    body: string,
    id: number,
    title: string,
    userId: number
}
export function GetApiData({url}: {url:string}) {
    const nullApidata: apiDataProps = {
        body: '',
        id: 0,
        title: '',
        userId: 0
    };
    const [data, setData] = useState(nullApidata);
//https://jsonplaceholder.typicode.com/posts
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then((data:apiDataProps) => {
                console.log(data);
                setData(data);
            });
    }, []);
    return (
        <div></div>
    )
    // return data;
}