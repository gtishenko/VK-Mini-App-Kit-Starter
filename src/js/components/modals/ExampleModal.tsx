import React from 'react';

import {
    Cell,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    IOS,
    PanelHeaderClose,
    usePlatform,
    ANDROID,
    Div
} from "@vkontakte/vkui";

import { Icon24Dismiss, Icon28PlaceOutline } from '@vkontakte/icons';

interface IProps {
    id: string,
    onClose: any,
}

export default function HomePanelBase(props: IProps) {
    const { id, onClose } = props;
    const platform = usePlatform();

    return (
        <ModalPage
            id={id}
            header={
                <ModalPageHeader
                    left={platform === ANDROID &&
                    <PanelHeaderClose onClick={onClose} />}
                    right={platform === IOS &&
                    <PanelHeaderButton onClick={onClose}><Icon24Dismiss/></PanelHeaderButton>}
                >
                    Модальное окно
                </ModalPageHeader>
            }
            onClose={onClose}
            settlingHeight={80}
        >
            <Div>
                <Cell before={<Icon28PlaceOutline />}>Cell</Cell>
            </Div>
        </ModalPage>
    )
}