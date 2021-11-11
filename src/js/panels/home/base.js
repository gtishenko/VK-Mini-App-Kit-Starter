import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {
    Group,
    Panel,
    PanelHeader,
    Placeholder,
    Snackbar
} from "@vkontakte/vkui";

import { Icon20CheckCircleFillGreen, Icon16ErrorCircleFill, Icon56InfoOutline } from '@vkontakte/icons';

class HomePanelBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            snackbar: null
        };
    }

    async fetchN(query, errorType = 0) {
        /*
        error types:
        0 — no error
        1 — snackbar
        2 — placeholder
        */
        const promise = await new Promise((resolve) => {
            fetch(query).then(response => response.text())
            .then(resolve)
            .catch((error) => {
                console.error(error);
                switch (errorType) {
                    case 0:
                        
                        break;
                    case 1:
                        this.showError("Не удалось выполнить запрос");
                        break;
                    case 2:
                        this.setState({
                            internetError: true
                        });
                        break;
                
                    default:
                        console.error("Invalid errorType");
                        break;
                }
            });
        });
        return promise;
    }

    showSnackbar(type, text) {
        if (this.state.snackbar) return;
        var icon;
        if(type === 0) icon = <Icon16ErrorCircleFill width={24} height={24} />;
        else if(type === 1) icon = <Icon20CheckCircleFillGreen width={24} height={24} />;
        this.setState({ snackbar:
            <Snackbar
                layout="vertical"
                onClose={() => this.setState({ snackbar: null })}
                before={icon}
            >
                {text}
            </Snackbar>
        });
    }

    componentDidMount() {
    }

    render() {
        const {id} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Главная</PanelHeader>
                <Group>
                    <Placeholder
                        icon={<Icon56InfoOutline />}
                        header={"Header"}
                    >
                        Привет
                    </Placeholder>
                </Group>
                {this.state.snackbar}
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);