<template>
  <div>
    
    <v-card class="mx-auto mt-10" max-width="500">

          <v-card flat>
            <v-row>
              <v-col cols=12>
                <h1 align="center">
              <v-icon x-large color="white" class="mt-n2" >mdi-database</v-icon>
              WZ-Statistics
              </h1>
              <h6 class="text-center text-overline mt-n4 ml-13">by <a style="text-decoration: none; color: inherit;" href="https://www.instagram.com/matzenzinho/">@matzenzinho</a></h6>
              </v-col>
            </v-row>
          </v-card>
    

      <!--STARTS SEARCH BAR -->
      <v-card flat>
        <v-sheet class="pa-0 mb-3">
          <v-text-field
            @keyup.enter="getUser"
            @click:append="getUser"
            v-model="searchQuery"
            label="Activision ID"
            placeholder="Activision ID"
            append-icon="mdi-magnify"
            autofocus
            dark
            dense
            solo-inverted
            hide-details
            clearable
            flat
            :loading="loadingSearch"
            clear-icon="mdi-close-circle-outline"
          >
          </v-text-field>
        </v-sheet>

        <v-alert class="ma-3" dense v-if="errorlog" border="left" :type="errorlevel">
        {{errorlog}}
        </v-alert>
        
      </v-card>
    <!--END SEARCH BAR -->
    <client-only><Favorites :username="this.searchQuery" @searchQueryEmmited="searchQueryChange" @getUserEmitted="getUser" /></client-only>

    <v-card class="flex-container pb-4" v-if="searchQuerySuccess == true">
  <v-row>
    <v-col class="d-flex flex-wrap justify-center mt-4" align="center">
      <v-card width="10em" height="6em" id="green" class="flex-item"><p style="color:white; font-size:20px" class="pt-3 ny-3">KD<br/>{{playerData.kdRatio}}</p></v-card>
      <v-card width="10em" height="6em" id="pink" class="flex-item"><p style="color:white; font-size:20px" class="pt-3 ny-3">NEXT KD<br/>{{nextKd}}</p></v-card>
      <v-card width="10em" height="6em" id="red" class="flex-item"><p style="color:white; font-size:20px" class="pt-3 ny-3">WINS<br/>{{playerData.wins}}</p></v-card>
      <v-card width="10em" height="6em" id="black" class="flex-item"><p style="color:white; font-size:20px" class="pt-3 ny-3">TIME PLAYED<br/>{{playerData.timePlayed}} HS</p></v-card>
      <v-card width="10em" height="6em" id="blue" class="flex-item"><p style="color:white; font-size:20px" class="pt-3 ny-3">KILLS<br/>{{playerData.kills}}</p></v-card>
      <v-card width="10em" height="6em" id="yellow" class="flex-item"><p style="color:white; font-size:20px" class="pt-3 ny-3">DEATHS<br/>{{playerData.deaths}}</p></v-card> 
    </v-col>
    </v-row>
  </v-card>

  </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head: {
    meta: [{
      name: 'WZ-Statistics', keywords: 'warzone, stats, kd, tracker',
      hid: 'description', name: 'description', content: 'Check your warzone stats online and calculate how much kills do you need to rise your KD!'}]
    },
  data() {
    return {
      searchQuery: null,
      newsearchQuery: null,
      searchQuerySuccess: false,
      loadingSearch: false,
      playerData: null,
      nextKd: null,
      errorlog: "",
      errorlevel: "",
    };
  },
  methods: {
    searchQueryChange(args) {
      this.searchQuery = args
    },
    getUser() {
      // ! console.log("received")
      if (this.searchQuery == null) {
        return;
      }
      this.errorlog = "";
      this.loadingSearch = true;
      this.newsearchQuery = this.searchQuery.replace("#", "%23");
      this.$router.push(`/?search=${this.newsearchQuery}`);
      axios.get('API/wzrequest', { params: { ID: this.searchQuery } }).then((res) => {
        if(res.status == 200) {
          if(res.data == "404 - Not found. Incorrect username or platform? Misconfigured privacy settings?") {
            this.errorlevel = "warning"
            this.errorlog = "404 - Not found. Incorrect username or platform? Misconfigured privacy settings?"
            this.loadingSearch = false;
          }
        else if(res.status != 200) {
          this.errorlog = "Internal server error! contact admin ig: @matzenzinho or try later."
          this.loadingSearch = false;
          }
          else if(res.data == "401 - Unauthorized. Incorrect username or password.") {
            this.errorlevel = "error"
            this.errorlog = "Internal server error! contact admin ig: @matzenzinho or try later."
            this.loadingSearch = false;
          }
        else {
          this.errorlog = ""
          // ! console.log('working =>', res)
          this.playerData = res.data
          res.data.br.timePlayed = (res.data.br.timePlayed/3600).toFixed(2)
          res.data.br.kdRatio = res.data.br.kdRatio.toFixed(2)
          this.playerData = res.data.br
          this.searchQuerySuccess = true;
          this.loadingSearch = false;
          this.calculateNextKd()
          }
        }
      });
    },
    calculateNextKd () {
      var nextkdnum = parseFloat(this.playerData.kdRatio)+0.01

      this.nextKd = this.playerData.deaths*nextkdnum
      this.nextKd = this.nextKd - this.playerData.kills
      this.nextKd = this.nextKd.toFixed(2)
  },
  },
  mounted() {
    if (
      this.$route.query.search === undefined ||
      this.$route.query.search === null ||
      this.$route.query.search === ""
    ) {
      this.searchQuery = null;
    } else {
      this.searchQuery = this.$route.query.search;
      this.getUser();
    }
  },
};
</script>

<style scoped>
.flex-container{
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
}

.flex-item{
  width: calc(50% - 2em);
  margin: 0.08em;
}

#red {
  background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(255, 118, 87), rgb(227, 74, 74)) repeat scroll 0% 0%;
}

#black {
  background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(99, 96, 95), rgb(0, 0, 0)) repeat scroll 0% 0%;
}

 #blue {
   background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(52, 181, 229), rgb(46, 132, 224)) repeat scroll 0% 0%;
 }

 #green {
   background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(102, 229, 181), rgb(41, 224, 105)) repeat scroll 0% 0%;
 }

#pink {
   background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(218, 118, 231), rgb(153, 15, 153)) repeat scroll 0% 0%;
 }

#yellow {
   background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(67, 22, 226), rgb(118, 30, 233)) repeat scroll 0% 0%;
 }

</style>