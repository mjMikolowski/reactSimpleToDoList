import React, { FC, useState } from "react";

import { styled } from "styled-components";
import { 
    IItem, 
    Item
} from "../Item/Item";
import { AddItem } from "../AddItem/AddItem";

export const List: FC = () => {

    const [items, setItems] = useState<IItem[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editUuid, setEditUuid] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>('');

    const saveItem = (uuid: number | null, description: string | null) => {
        if (uuid === null && description === null) {
            setEditMode(false);
            setEditUuid(null);
            return;
        }

        const newItems = [...items];
        if (uuid != null && description != null) {
            newItems.filter(item => item.uuid === uuid)[0].description = description
        } else {
            newItems.push({
                description: description || '',
                uuid: Date.now(),
                done: false
            })
        }

        setItems(newItems);
        setEditMode(false);
        setEditUuid(null);
    }

    return (<ListStyled>
        <AddItem 
            save={saveItem} 
            isNew={!editMode} 
            text={editText} 
            uuid={editUuid} 
        />
        {
            items.map((item: IItem, index: number) => (<Item 
                id={index} 
                key={item.uuid}
                description={item.description} 
                uuid={item.uuid}
                done={item.done}
                isEditting={item.uuid === editUuid}
                onEdit={(uuid: number | null) => {
                    setEditText(items.filter(item => item.uuid === uuid)[0].description);
                    setEditMode(true);
                    setEditUuid(uuid);
                }}
                onDelete={(uuid: number | null) => {
                    const newItems = items.filter(item => item.uuid !== uuid);
                    setItems(newItems);
                }}
                onDone={(uuid: number | null) => {
                    const item = items.filter(item => item.uuid === uuid)[0]
                    item.done = !item.done;
                    setItems([...items]);
                }}
            />))
        }
    </ListStyled>)
};

const ListStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;