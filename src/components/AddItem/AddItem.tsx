import React, { 
    FC, 
    useEffect, 
    useState 
} from "react";
import { useTranslation } from 'react-i18next';
import { styled } from "styled-components";

import { ButtonStyled } from "../../styles/shared.styles";

interface IAddItem {
    save: (uuid: number | null, value: string | null) => void,
    isNew: boolean,
    text: string,
    uuid: number | null
}

export const AddItem: FC<IAddItem> = ({ 
    save, 
    isNew,
    text,
    uuid
}) => {

    const { t } = useTranslation();

    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        if (!isNew) {
            setDescription(text);
        }
    }, [isNew]);

    return (<AddItemStyled>
        <h2>{ isNew ? t('add_item') : t('edit_item') }</h2>
        <textarea rows={4} onChange={e => setDescription(e.target.value)} value={description} />
        <ButtonsRow>
            <ButtonStyled disabled={!description} onClick={() => {
                if (!!description && description.length > 0) {
                    save(uuid, description);
                    setDescription('');
                }
            }}> 
                { isNew ? t('add') : t('update') }
            </ButtonStyled>
            { !isNew && (<ButtonStyled onClick={() => {
                    save(null, null);
                    setDescription('');
                }}> 
                    { t('back') }
                </ButtonStyled>)
            }
        </ButtonsRow>
    </AddItemStyled>)
};

const AddItemStyled = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;

    h2 {
        text-transform: uppercase;
        text-align: center;
    }
    
    textarea {
        width: 100%;
        resize: none;
        box-sizing: border-box;
    }
`;

const ButtonsRow = styled.div`
    display: flex;
    gap: 10px;
`;