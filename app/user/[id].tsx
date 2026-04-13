import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {API} from "../utils/api"

export default function UserDetail() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${API}/users/${id}`
      );
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user)
    return <Text style={styles.loading}>Loading...</Text>;

  return (
        <View style={styles.main}>
               <View style={styles.container}>
                        <View style={styles.avatar}>
                               <Text style={styles.avatarText}>
                                     {user.name?.charAt(0)}
                               </Text>
                        </View>
                        <Text style={styles.name}>{user.name}</Text>
                        <View style={styles.card}>
                             <Row label="Email" value={user.email} />
                             <Row label="Phone" value={user.phone} />
                             <Row label="Company" value={user.company?.name} />
                             <Row label="Address"
                                    value={`${user.address?.street}, ${user.address?.city}`}/>
                             <View style={styles.row}>
                                <Text style={styles.label}>Website: </Text>
                                <Pressable onPress={() =>Linking.openURL(`https://${user.website}`)}>
                                    <Text style={styles.link}>{user.website}</Text>
                                 </Pressable>
                            </View>
                       </View>
               </View>
        </View>
  );
}

// Reusable Row
function Row({ label, value }: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
    main:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
        height:'100%'
    },
    container: {
        minWidth: 400,
        height:500,
        backgroundColor: "#7b2cbf",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: "center",
        borderRadius:10,
        paddingTop: 10,
    },

    avatar: {
       width: 90,
       height: 90,
       borderRadius: 45,
       backgroundColor: "#7b2c",
       justifyContent: "center",
       alignItems: "center",
       marginBottom: 10,
    },

    avatarText: {
       color: "#ffffff",
       fontSize: 36,
       fontWeight: "bold",
    },
    name: {
       fontSize: 20,
       fontWeight: "600",
       marginBottom: 20,
       color:'#fff'
    },

    card: {
       width: "90%",
       backgroundColor: "#f9f9f9",
       padding: 20,
       borderRadius: 12,
       elevation: 3,
    },

    row: {
       marginBottom: 12,
       display:'flex',
       flexDirection:'row',
       alignItems:'center',
       justifyContent:"flex-start"
    },

    label: {
       fontSize: 20,
       color: "#000000",
       fontWeight:"500"
    },
    value: {
       fontSize: 15,
       color: "#000000",
       fontWeight: "500",
    },

    link: {
       fontSize: 15,
       color: "#7b2cbf",
       fontWeight: "500",
       textDecorationLine: "underline",
    },
    loading: {
       textAlign: "center",
       marginTop: 50,
       fontSize: 16,
    },
});