

import { useEffect, useState } from "react";
import {View, TextInput, FlatList, ActivityIndicator, Text, Pressable} from "react-native";
import {useRouter} from "expo-router";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";

export default function Home(){


     const [users, setUsers] = useState([]);
     const [filter, setFilter] = useState([]);
     const [loading, setLoading] = useState(true);
     const [search, setSearch] = useState("");
     const [refreshing, setRefreshing] = useState(false);
     const {width} = useWindowDimensions();
     const isSmall = width < 500;
     const isMedium = width < 800;
     const router = useRouter();
           
     useEffect(()=>{
        fetchUsers();
     }, []);

     const fetchUsers = async() =>{
        try{
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await res.json();
            setUsers(data);
            setFilter(data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
     };
     
     const handleSearch = (text: string) =>{
        setSearch(text);
        const filtered = users.filter(
            (user: any) =>
                user.name.toLowerCase().includes(text.toLowerCase()) ||
                user.email.toLowerCase().includes(text.toLowerCase())
        );
        setFilter(filtered);
     };

     const onRefresh = async() => {
         setRefreshing(true);
         await fetchUsers();
         setRefreshing(false);
     }

     if(loading) return <ActivityIndicator size="large" />;

     return(
        <View style={{padding: 10}}>
                <Text style={styles.title}>Users Table</Text>
                <TextInput placeholder="Search Users...."  value={search} onChangeText={handleSearch} 
                         style={styles.headerInput}/>      
                <View style={styles.header}>
                           <Text style={[styles.headerText, { flex: 1.2 }]}>Name</Text>
                           {!isSmall &&(<Text style={[styles.headerText, { flex: 2 }]}>Email</Text>)}
                           {!isMedium &&(<Text style={[styles.headerText, { flex: 1.5 }]}>Phone</Text>)}
                           {!isSmall && (<Text style={[styles.headerText, { flex: 1.5 }]}>Company</Text>)}
                </View>
                <FlatList data={filter} keyExtractor={(item: any) => item.id.toString()} 
                           refreshing={refreshing} onRefresh={onRefresh} renderItem={({item}: any) =>(
                            <Pressable style={styles.row} onPress={()=> router.push({pathname:'/user/[id]', params:{id: item.id}})}>
                                        <Text style={[styles.col, { flex: 1.2 }]} numberOfLines={1}>
                                             {item.name}
                                        </Text>
                                    {!isSmall && 
                                        <Text style={[styles.col, { flex: 2 }]} numberOfLines={1}>
                                             {item.email}
                                        </Text>}

                                    {!isMedium &&
                                            <Text style={[styles.col, { flex: 1.5 }]} numberOfLines={1}>
                                            {item.phone}
                                        </Text>}

                                    {!isSmall &&    
                                        <Text style={[styles.col, { flex: 1.5 }]} numberOfLines={1}>
                                            {item.company?.name}
                                        </Text>}
                            </Pressable>
                )} />
        </View>
     )

}


const styles = StyleSheet.create({
  title:{
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize:30,
    fontWeight:900,    
    color:'#7b2cbf',
    textAlign:'center'
    },
  header: {
    flexDirection: "row",
    backgroundColor: "#7b2cbf",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  headerInput:{
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 20,
    flex: 1,
    marginLeft: 10,
    marginBottom:10,

  },

  row: {
    flexDirection: "row",
  
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#7b2c",
   
  },

  col: {
    fontSize: 14,
    color: "#333",
  },
});