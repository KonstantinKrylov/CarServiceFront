<template>
    <div>
        <div class="d-inline-flex align-center">
            <v-text-field @keypress.enter="searchRequest" label="Serial number" v-model="searchText"></v-text-field>
            <v-btn @click="searchRequest">Search</v-btn>
            <v-btn @click="createNewCar">New</v-btn>
        </div>
        <div v-if="showCard">
            <v-form>
                <v-container>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field label="Serial number" v-model="searchedCar.serialNumber"/>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Activation Code" v-model="searchedCar.activationCode"/>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Code" v-model="searchedCar.code"/>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Vehicle Code" v-model="searchedCar.vehicleCode"/>
                        </v-flex>

                        <v-expansion-panel>
                            <v-expansion-panel-content>
                                <div slot="header">Engine</div>
                                <div class="ma-3">
                                    <v-flex xs12>
                                        <v-text-field label="Capacity" v-model="searchedCar.engine.capacity"/>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Num Cylinders" v-model="searchedCar.engine.numCylinders"/>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Max RPM" v-model="searchedCar.engine.maxRpm"/>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Manufacturer Code" v-model="searchedCar.engine.manufacturerCode"/>
                                    </v-flex>
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-content>
                                <div slot="header">Fuel Figures</div>
                                <div class="ma-3">
                                    <v-flex xs12>
                                        <v-text-field label="Speed" v-model="searchedCar.fuelFigures.speed"/>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Mpg" v-model="searchedCar.fuelFigures.mpg"/>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Usage Description" v-model="searchedCar.fuelFigures.usageDescription"/>
                                    </v-flex>
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-content>
                                <div slot="header">Performance Figures</div>
                                <div class="ma-3">
                                    <v-flex xs12>
                                        <v-text-field label="Octane Rating" v-model="searchedCar.octaneRating"/>
                                    </v-flex>
                                    <v-expansion-panel>
                                        <v-expansion-panel-content>
                                            <div slot="header">Acceleration</div>
                                            <div class="ma-3">
                                                <v-flex xs12>
                                                    <v-text-field label="Speed" v-model="searchedCar.performanceFigures.acceleration.mph"/>
                                                </v-flex>
                                                <v-flex xs12>
                                                    <v-text-field label="Speed" v-model="searchedCar.performanceFigures.acceleration.seconds"/>
                                                </v-flex>
                                            </div>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-layout>
                </v-container>
            </v-form>
            <v-btn @click="saveRequest">Save</v-btn>
            <v-btn @click="clear">Clear</v-btn>
        </div>
        <v-snackbar bottom v-model="showSnack">{{snackText}}</v-snackbar>

    </div>

</template>

<script>
    import axios from "axios"

    export default {
        name: "Search",
        data() {
            return {
                searchText: "123456789",
                searchedCar: {
                    engine: {},
                    fuelFigures: {},
                    performanceFigures: {
                        acceleration: {}
                    },
                },
                showCard: false,
                showSnack :false,
                snackText: ""
            };
        },
        methods: {
            searchRequest() {
                axios.get(`/car/serial/${this.searchText}`)
                    .then(({data}) => {
                        this.showCard = true;
                        this.searchedCar = data
                    });
            },
            saveRequest() {
                axios.post("/car", this.searchedCar)
                    .then(() => {
                        this.showSnack = true;
                        this.snackText = "Success"
                    })
                    .catch(() => {
                        this.showSnack = true;
                        this.snackText = "Error"
                    })
            },
            clear() {
                this.searchedCar = {
                    engine: {},
                    fuelFigures: {},
                    performanceFigures: {
                        acceleration: {},
                    }
                }
            },
            createNewCar(){
                this.clear();
                this.showCard = true;
            }
        }
    }

</script>

<style scoped>

</style>