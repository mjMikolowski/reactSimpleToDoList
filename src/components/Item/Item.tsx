import React, { FC } from "react";
import { useTranslation } from 'react-i18next';
import { styled } from "styled-components";

import { ButtonStyled } from "../../styles/shared.styles";

export interface IItem {
    id?: number,
    uuid: number | null,
    description: string,
    isEditting?: boolean,
    done: boolean,
    onEdit?: (uuid: number | null) => void,
    onDelete?: (uuid: number | null) => void,
    onDone?: (uuid: number | null) => void
}

export const Item: FC<IItem> = ({
    id,
    uuid,
    description,
    isEditting,
    done,
    onEdit,
    onDelete,
    onDone
}) => {

    const { t } = useTranslation();

    return (<ItemStyled key={uuid} isEditting={isEditting} >
        <div>{ id !== undefined && id !== null && (id + 1) }</div>
        <DescriptionStyled done={done}>{ description }</DescriptionStyled>
        <input type="checkbox" onClick={() => {
            !!onDone && onDone(uuid)
        }}/>
        <ButtonStyled onClick={() => {
            !!onEdit && onEdit(uuid)
        }} >
            { t('edit') }
        </ButtonStyled>
        <ButtonStyled onClick={() => {
            !!onDelete && onDelete(uuid)
        }}> 
            { t('delete') }
        </ButtonStyled>
    </ItemStyled>)
};

const ItemStyled = styled.div<{isEditting: boolean | undefined}>`
    width: 600px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 16px;
    line-height: 24px;
    background: ${props => props.isEditting && 'rgba(200, 200, 200, 0.8)'};
    padding: 5px;

    > div {
        width: 100%;
    }

    > div:first-child {
        width: 30px;
        text-align: right;
    }

    input {
        width: 44px;
        height: 44px;
    }

    input[type="checkbox"]:checked {
        accent-color: green;
    }
`;

const DescriptionStyled = styled.div<{done: boolean}>`
    text-decoration: ${props => props.done && 'line-through'};
    font-size: 24px;
`;