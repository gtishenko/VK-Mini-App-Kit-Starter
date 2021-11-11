import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {goBack, closeModal, setStory} from "./js/store/router/actions";
import {getActivePanel} from "./js/services/_functions";
import bridge from '@vkontakte/vk-bridge'
import {setColorScheme} from "./js/store/vk/actions";
import queryString from 'query-string';

import {
    Epic,
    View,
    Root,
    ModalRoot,
    ConfigProvider,
    AdaptivityProvider,
    AppRoot,
    TabbarItem,
    Tabbar,
    SplitLayout,
    PanelHeader,
    SplitCol,
    Group,
    Cell,
    Panel
} from "@vkontakte/vkui";

import HomePanelBase from './js/panels/home/base';

import MorePanelBase from './js/panels/more/base';

import ExampleModal from './js/components/modals/ExampleModal';

import { Icon28Newsfeed, Icon28NewsfeedOutline, Icon28ServicesOutline, Icon28MessageOutline, Icon28ClipOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import { setData } from './js/store/data/actions';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            platform: ''
        };

        this.lastAndroidBackAction = 0;
    }

    componentDidMount() {
        const {goBack, dispatch} = this.props;

        // dispatch(VK.initApp());

        var params = queryString.parse(window.location.search);
        var platform = "";

        if(params.vk_platform === 'mobile_web' || params.vk_platform === 'desktop_web') platform = 'vkcom';
        else if(params.vk_platform === 'mobile_android' || params.vk_platform === 'mobile_android_messenger') platform = 'android';
        else platform = 'ios';

        this.setState({
            platform: platform
        });

        bridge.subscribe((e) => {
            if(e.detail.type === 'VKWebAppUpdateConfig') {
                dispatch(setColorScheme(e.detail.data.scheme));
            }
         });

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack();
            } else {
                window.history.pushState(null, null);
            }
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {activeView, activeStory, activePanel, scrollPosition} = this.props;

        if (
            prevProps.activeView !== activeView ||
            prevProps.activePanel !== activePanel ||
            prevProps.activeStory !== activeStory
        ) {
            let pageScrollPosition = scrollPosition[activeStory + "_" + activeView + "_" + activePanel] || 0;

            window.scroll(0, pageScrollPosition);
        }
    }

    render() {
        const {goBack, setStory, closeModal, popouts, activeView, activeStory, activeModals, panelsHistory} = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];
        let popout = (popouts[activeView] === undefined) ? null : popouts[activeView];
        let activeModal = (activeModals[activeView] === undefined) ? null : activeModals[activeView];

        const homeModals = (
            <ModalRoot activeModal={activeModal}>
                <ExampleModal
                    id="EXAMPLE_MODAL"
                    onClose={() => closeModal()}
                />
            </ModalRoot>
        );

        var params = queryString.parse(window.location.search);

        const isDesktop = params.vk_platform === "desktop_web";
        const hasHeader = params.vk_platform !== "desktop_web";

        return (
            <ConfigProvider platform={this.state.platform} isWebView={true}>
                <AdaptivityProvider>
                    <AppRoot>
                        <SplitLayout
                            header={hasHeader && <PanelHeader separator={false} />}
                            style={{ justifyContent: "center" }}
                        >
                        {isDesktop && (
                            <SplitCol fixed width="280px" maxWidth="280px">
                            <Panel>
                                {hasHeader && <PanelHeader />}
                                <Group>
                                    <Cell
                                        disabled={activeStory === 'home'}
                                        style={activeStory === 'home' ? {
                                        backgroundColor: "var(--button_secondary_background)",
                                        borderRadius: 8
                                        } : {}}
                                        before={<Icon28NewsfeedOutline />}
                                        onClick={() => setStory("home", "base")}
                                    >
                                        Главная
                                    </Cell>
                                <Cell
                                    disabled={activeStory === 'services'}
                                    style={activeStory === 'services' ? {
                                    backgroundColor: "var(--button_secondary_background)",
                                    borderRadius: 8
                                    } : {}}
                                    before={<Icon28ServicesOutline />}
                                    onClick={() => setStory("services", "base")}
                                >
                                    Сервисы
                                </Cell>
                                <Cell
                                    disabled={activeStory === 'messages'}
                                    style={activeStory === 'messages' ? {
                                    backgroundColor: "var(--button_secondary_background)",
                                    borderRadius: 8
                                    } : {}}
                                    before={<Icon28MessageOutline />}
                                    onClick={() => setStory("messages", "base")}
                                >
                                    Месенджер
                                </Cell>
                                <Cell
                                    disabled={activeStory === 'clips'}
                                    style={activeStory === 'clips' ? {
                                    backgroundColor: "var(--button_secondary_background)",
                                    borderRadius: 8
                                    } : {}}
                                    before={<Icon28ClipOutline />}
                                    onClick={() => setStory("clips", "base")}
                                >
                                    Клипы
                                </Cell>
                                <Cell
                                    disabled={activeStory === 'profile'}
                                    style={activeStory === 'profile' ? {
                                    backgroundColor: "var(--button_secondary_background)",
                                    borderRadius: 8
                                    } : {}}
                                    before={<Icon28UserCircleOutline />}
                                    onClick={() => setStory("profile", "base")}
                                >
                                    Профиль
                                </Cell>
                                </Group>
                            </Panel>
                            </SplitCol>
                        )}

                        <SplitCol
                                animate={!isDesktop}
                                spaced={isDesktop}
                                width={isDesktop ? '560px' : '100%'}
                                maxWidth={isDesktop ? '560px' : '100%'}
                            >
                                <Epic activeStory={activeStory} tabbar={!isDesktop &&
                                    <Tabbar>
                                    <TabbarItem
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setStory('home', 'base');
                                        }}
                                        selected={activeStory === 'home'}
                                        >
                                            <Icon28Newsfeed/>
                                        </TabbarItem>
                                    </Tabbar>
                                }>
                                <Root id="home" activeView={activeView} popout={popout}>
                                <View
                                    id="home"
                                    modal={homeModals}
                                    activePanel={getActivePanel("home")}
                                    history={history}
                                    onSwipeBack={() => goBack()}
                                >
                                    <HomePanelBase id="base" withoutEpic={false}/>
                                </View>
                            </Root>
                            <Root id="more" activeView={activeView} popout={popout}>
                                <View
                                    id="more"
                                    modal={homeModals}
                                    activePanel={getActivePanel("more")}
                                    history={history}
                                    onSwipeBack={() => goBack()}
                                >
                                    <MorePanelBase id="callmodal"/>
                                </View>
                            </Root>
                                </Epic>
                            </SplitCol>
                            </SplitLayout>
                    </AppRoot>
                </AdaptivityProvider>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeView: state.router.activeView,
        activeStory: state.router.activeStory,
        panelsHistory: state.router.panelsHistory,
        activeModals: state.router.activeModals,
        popouts: state.router.popouts,
        scrollPosition: state.router.scrollPosition,
        activePanel: state.router.activePanel,

        colorScheme: state.vkui.colorScheme
    };
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({setStory, goBack, closeModal, setData}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);