import React from 'react';
import {connect} from 'react-redux';

import {
    Cell,
    List,
    Avatar,
    InfoRow,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    withPlatform,
    IOS,
    PanelHeaderClose
} from "@vkontakte/vkui";

import { Icon24Dismiss } from '@vkontakte/icons';

interface IProps {
    id: string,
    onClose: any,
    platform?: any,
}

class ExampleModal extends React.Component<IProps> {

    render() {
        const { id, onClose, platform } = this.props;

        return (
            <ModalPage
                id={id}
                header={
                    <ModalPageHeader
                        left={platform !== IOS &&
                        <PanelHeaderClose onClick={onClose} />}
                        right={platform === IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Dismiss/></PanelHeaderButton>}
                    >
                        Информация о боте
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
                <Cell
                    description="Описание"
                    before={<Avatar size={40} src="https://vk.com/images/community_100.png?ava=1"/>}
                >
                    Название
                </Cell>
                <List>
                    <Cell>
                        <InfoRow header="Подписчиков">
                            8800
                        </InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow header="Записей">
                            555
                        </InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow header="Рейтинг">
                            3535
                        </InfoRow>
                    </Cell>
                </List>
            </ModalPage>
        );
    }

}

export default withPlatform(connect()(ExampleModal));
