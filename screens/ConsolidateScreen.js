// import { View, Text } from "react-native";
// import React from "react";
// import { SpeedDial } from "@rneui/themed";

// const ConsolidateScreen = ({ route, navigation }) => {
//   const [open, setOpen] = React.useState(false);

//   const { uid } = route.params;

//   return (
//     <View>
//       <Text>ConsolidateScreen</Text>
//       <Text>UID: {uid}</Text>
//       <SpeedDial
//         isOpen={open}
//         icon={{ name: "edit", color: "#fff" }}
//         openIcon={{ name: "close", color: "#fff" }}
//         onOpen={() => setOpen(!open)}
//         onClose={() => setOpen(!open)}
//       >
//         <SpeedDial.Action
//           icon={{ name: "add", color: "#fff" }}
//           title="Agrega un nuevo favorito"
//           onPress={() => navigation.goBack()}
//         />
  
//       </SpeedDial>
//     </View>
//   );
// };

// export default ConsolidateScreen;
import { View, Text } from 'react-native'
import React from 'react'

const ConsolidateScreen = () => {
  return (
    <View>
      <Text>ConsolidateScreen</Text>
    </View>
  )
}

export default ConsolidateScreen