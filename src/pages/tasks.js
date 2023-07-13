


// import React,{ useState, useEffect } from "react";
// import { useAuth } from "oidc-react";

// const Tasks = () => {
//     const auth = useAuth()

//     const [tasks, setTasks] = useState(Array);

//     useEffect(() => {
//         if (!auth.isLoading){
//         const token = auth.userData?.access_token
//         const headers = { 'Authorization': 'Bearer ' + token };
//         fetch('http://localhost:8000/v1/tasks', {headers})
//             .then((res) => res.json())
//             .then((data) => {
//                 setTasks(data?.tasks);
//             })
//             .catch((err) => {
//                 console.log(err.message);
//             });
//         }
//     }, [auth]);
//     return (
//         <div>
//             <h1>
//                 {tasks.map((task) => {
//                     return (
//                         <div className="post-card" key={task.id}>
//                             <h2 className="post-title">{task.name}</h2>
//                             <p className="post-body">{task.description}</p>
//                             <p className="post-body">{task.points}</p>
//                         </div>
//                     );
//                 })}
//             </h1>
//         </div>
//     );
// };

// export default Tasks;

import { useEffect, useState } from "react";
//import "./App.css";
//import Navbar from "./components/Navbar/Navbar";
import Board from "../components/Board/Board";
// import data from '../data'
import { DragDropContext } from "react-beautiful-dnd";
import { useAuth } from "oidc-react";
import { v4 as uuidv4 } from "uuid";
import Editable from "../components/Editable/Editable";

function Tasks() {
  const auth = useAuth()

  const [data, setData] = useState(Array);

  useEffect(() => {
    if (!auth.isLoading) {
      const token = auth.userData?.access_token
      const headers = { 'Authorization': 'Bearer ' + token };
      fetch('http://localhost:8000/v1/board', { headers })
        .then((res) => res.json())
        .then((data) => {
          setData(data?.columns);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [auth]);
  // const [data, setData] = useState(
  //   localStorage.getItem("kanban-board")
  //     ? JSON.parse(localStorage.getItem("kanban-board"))
  //     : []
  // );

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].name = title;
    setData(tempData);
  };

  const dragCardInBoard = (source, destination) => {
    let tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    tempData[destinationBoardIdx].cards.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].cards[source.index]
    );
    tempData[sourceBoardIdx].cards.splice(source.index, 1);

    return tempData;
  };

  // const dragCardInSameBoard = (source, destination) => {
  //   let tempData = Array.from(data);
  //   console.log("Data", tempData);
  //   const index = tempData.findIndex(
  //     (item) => item.id.toString() === source.droppableId
  //   );
  //   console.log(tempData[index], index);
  //   let [removedCard] = tempData[index].cards.splice(source.index, 1);
  //   tempData[index].cards.splice(destination.index, 0, removedCard);
  //   setData(tempData);
  // };

  const addCard = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].cards.push({
      id: uuidv4(),
      title: title,
      tags: [],
      task: [],
    });
    setData(tempData);
  };

  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].cards.findIndex((item) => item.id === cardId);

    tempData[index].cards.splice(cardIndex, 1);
    setData(tempData);
  };

  const addBoard = (title) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      name: title,
      cards: [],
    });
    setData(tempData);
  };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    setData(dragCardInBoard(source, destination));
  };

  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;
    console.log(tempBoards);
    setData(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(data));
    if (!auth.isLoading) {
      const token = auth.userData?.access_token
      const headers = {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      fetch('http://localhost:8000/v1/board', { method: 'POST', headers: headers , body: JSON.stringify({columns: data})})
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [auth, data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app_outer">
        <div className="app_boards">
          {data.map((item) => (
            <Board
              key={item.id}
              id={item.id}
              name={item.name}
              card={item.cards}
              setName={setName}
              addCard={addCard}
              removeCard={removeCard}
              removeBoard={removeBoard}
              updateCard={updateCard}
            />
          ))}
          <Editable
            class={"add__board"}
            name={"Add Board"}
            btnName={"Add Board"}
            onSubmit={addBoard}
            placeholder={"Enter Board  Title"}
          />
        </div>
      </div>
    </DragDropContext>
  );
}

export default Tasks;