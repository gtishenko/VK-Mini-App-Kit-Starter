import React from 'react';
import { useDispatch } from 'react-redux';

import {
    Alert,
    Div,
    Group,
    List,
    Panel,
    PanelHeader,
    SimpleCell
} from "@vkontakte/vkui";

import { showSnackbar, openModal, openPopout, closePopout } from '../../store/router/actions';

interface IProps {
    id: string,
    snackbar: JSX.Element | null
}

export default function HomePanelBase(props: IProps) {
    const { id, snackbar } = props;
    const dispatch = useDispatch();

    function modal() {
        dispatch(openModal("EXAMPLE_MODAL"));
    }

    function openSnackbar() {
        dispatch(showSnackbar("success", "Успешно выполено!"));
    }

    function alert() {
        dispatch(openPopout(<Alert
            actions={[{
              title: 'Отмена',
              autoclose: true,
              mode: 'cancel'
            }, {
              title: 'Удалить',
              autoclose: true,
              mode: 'destructive',
            }]}
            actionsLayout="horizontal"
            onClose={() => dispatch(closePopout())}
            header="Удаление документа"
            text="Вы уверены, что хотите удалить этот документ?"
          />));
    }

    return (
        <Panel id={id}>
            <PanelHeader>Главная</PanelHeader>
            <Group>
                <Div>
                    <List>
                        <SimpleCell onClick={() => modal()}>Открыть модалку</SimpleCell>
                        <SimpleCell onClick={() => openSnackbar()}>Отобразить Snackbar</SimpleCell>
                        <SimpleCell onClick={() => alert()}>Открыть Alert</SimpleCell>
                    </List>
                </Div>
            </Group>
            {snackbar}
        </Panel>
    )
}