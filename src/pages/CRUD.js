
import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image, Dimensions, Button, TouchableOpacity } from "react-native";
import { Container, Body, Icon, Header, Left, Right, Title } from 'native-base';
import MapView, { Polyline } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { Actions } from 'react-native-router-flux';
import getDirections from 'react-native-google-maps-directions'
import {db, firebaseAuth, storage} from '../../reducer/Firebase';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class AnyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //dataSources: [],
            markers: [{
                coordinate: {
                    latitude: 37.359426,
                    longitude: 127.104886,
                },
                description: "내용",
                image: {
                    uri: "https://mblogthumb-phinf.pstatic.net/MjAxNzEyMThfMjQ1/MDAxNTEzNjA3MTcwNTg4.f9D3x971p8iDr_ox3nOQZmp2bHHA3YEtAvWI6-Zq6aAg.1E7HSp02TKDPZwC1wdciQdKiMEEzo0TvuY0ts5OmK4Mg.PNG.ooza-/IMG_9198.PNG?type=w800"
                },
            }],
            region: {
                latitude: 37.359426,
                longitude: 127.104886,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            },
            lastItem: 0,
            coordi: [{
                latitude: 0.0000000,
                longitude: 0.0000000,
            }]
        }
    }

    //lastItem = this.state.markers.length - 1;

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }
    componentDidMount() {

        fetch('http://52.78.131.123/info/' + this.props.item)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSources: responseJson.res,
                }, function () {
                });
                if (this.state.dataSources.length > 0) {
                    for (var i = 0; i < this.state.dataSources.length; i++) {
                        this.state.markers[i] = {
                            coordinate: {
                                latitude: this.state.dataSources[i].Info_Latitude,
                                longitude: this.state.dataSources[i].Info_Longitude
                            },
                            description: this.state.dataSources[i].Info_Content,
                            image: {
                                uri: this.state.dataSources[i].Info_Image,
                            },
                        }
                        this.state.coordi[i] = {
                            latitude: this.state.dataSources[i].Info_Latitude,
                            longitude: this.state.dataSources[i].Info_Longitude
                        }
                    }
                    this.state.region = {
                        latitude: this.state.dataSources[0].Info_Latitude,
                        longitude: this.state.dataSources[0].Info_Longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }
                    this.setState({
                        markers: this.state.markers,
                        coordi: this.state.coordi,
                        region: this.state.region,
                        lastItem: this.state.markers.length - 1,
                    }, function () {
                    });
                }
                this.setState({
                    markers: this.state.markers,
                    coordi: this.state.coordi,
                    region: this.state.region,
                    lastItem: this.state.markers.length - 1,
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here

        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.state.markers[index];
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta
                        },
                        350
                    );
                }
            }, 10);
        });
    }


    handleGetDirections = () => {
        const data = {
            source: {
                latitude: this.state.markers[0].coordinate.latitude,
                longitude: this.state.markers[0].coordinate.longitude

            },
            destination: {
                latitude: this.state.markers[this.state.lastItem].coordinate.latitude,
                longitude: this.state.markers[this.state.lastItem].coordinate.longitude
            },
            params: [
                {
                    key: "travelmode",
                    value: "transit"        // may be "walking", "bicycling" or "transit" as well
                }
            ],
            waypoints: [

            ]
        }
        getDirections(data)
    }

    saveDataDetail = (marker) => {
        Actions.detail({ marker: marker });

    }
    // 여행정보작성 오프너
    deletetrip = (Trip_No) => {
        fetch('http://52.78.131.123/tripdelete', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },//Request Type
            body: JSON.stringify({
                Trip_No: Trip_No
            }),//post body
        }).then((response) => {
            Actions.pop();
        });
    }

    goback = () => {
        Actions.pop()
    }

    render() {

        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });

        return (
            <View style={styles.container}>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={() => this.goback()}>
                            <Icon name='arrow-back' />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                    <Title>{this.props.title}</Title>
                    </Body>
                    <Right>
                    {this.props.user === firebaseAuth.currentUser.uid ? <TouchableOpacity onPress={() => this.deletetrip(this.props.item)}>
                            <Icon name='trash' />
                        </TouchableOpacity> :
                            <Text></Text>
                        }
                    </Right>
                </Header>
                <Text style={styles.header}>검은선은 Polyline 파란석은 차의 경로(미국지역가능) 
                아래의 자세한 구글 경로는 대중교통입니다.</Text>
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.map}
                >
                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]} />
                                    <View style={styles.marker} />
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                    <Polyline
                        coordinates={this.state.coordi}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />

                    <MapViewDirections
                        origin={this.state.coordi[0]}
                        waypoints={
                            (this.state.coordi.length > 2) ? this.state.coordi.slice(1, -1) : null
                        }
                        destination={this.state.coordi[this.state.coordi.length - 1]}
                        apikey={"AIzaSyDyoS36lwCGrpT2s0FzrsU1b2Nf8GjFKo0"}
                        strokeWidth={3}
                        strokeColor="blue"
                        optimizeWaypoints={true}
                    />


                </MapView>

                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {this.state.markers.map((marker, index) => (
                        <View style={styles.card} key={index}>
                            <TouchableOpacity style={styles.cardImage} onPress={() => this.saveDataDetail(marker)}>
                                <Image
                                    source={marker.image}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>

                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardDescription}>
                                    {marker.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>

                <Button style={styles.diretion} onPress={this.handleGetDirections} title="자세한 구글 경로 찾기" />

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    map: {
        flex: 8,
    },
    scrollView: {
        position: "absolute",
        bottom: 70,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
    diretion: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
    }
});