import { useState } from 'react';
import { db } from "../firebase"
import { View, Button, Text } from 'react-native';
import { runTransaction, doc  } from 'firebase/firestore';

const sfDocRef = doc(db, 'guia', 'config');

const EnterGuideScreen = () => {
  const [guiaActual, setGuiaActual] = useState(null);

  const MAX_RETRIES = 3;
  let retries = 0;
  

  const incrementNumber = async () => {

    const transactionFunction = async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw new Error('Document does not exist!');
      }
  
      const isUpdating = sfDoc.data().isUpdating;
  
      if (!isUpdating) {
        transaction.update(sfDocRef, { isUpdating: true });
  
        const currentNumber = parseInt(sfDoc.data().guiaActual, 10);
        const newNumber = currentNumber + 1;
  
        transaction.update(sfDocRef, { guiaActual: newNumber.toString() });
        transaction.update(sfDocRef, { isUpdating: false });
  
        return newNumber;
      } else {
        console.log('Document is currently being updated. Try again later.');
        return null;
      }
    };


  
    try {
      const newNumber = await runTransaction(db, async (transaction) => {
        return await transactionFunction(transaction);
      });
  
      if (newNumber !== null) {
        console.log('Transaction successfully committed!', newNumber);
        setGuiaActual(newNumber.toString());
      }
    } catch (error) {
      if (error.code === 'failed-precondition' && retries < MAX_RETRIES) {
        retries++;
        console.log('Transaction failed due to precondition. Retrying...');
        await incrementNumber(); // Reintentar la transacción
      } else {
        console.log('Transaction failed three times: ', error);
        // Manejar el error si se excedieron los reintentos
      }
    }
  };
  



  
  return (
    <View>
      <Button title="Incrementar número" onPress={incrementNumber} />
      {guiaActual && <Text>Nuevo valor: {guiaActual}</Text>}
    </View>
  );
};

export default EnterGuideScreen;