import { Center, Text, Icon} from "native-base";
import Logo from '../assets/logo.svg';
import { Button } from "../components/Button";
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from "../hooks/useAuth";

export function SignIn(){
    const { signIn, isUserLoading } = useAuth()
    
    return(
    <Center flex="1" bgColor="gray.900" p={7}>        
        <Logo width={212} height={40}/>
        <Button 
          type="SECONDARY"
          title="ENTRAR COM GOOGLE" 
          mt={12}
          leftIcon={
            <Icon as={Fontisto} 
              name="google" 
              color="white" 
              size="md" 
            />
          }
          isLoading={isUserLoading}
          _loading={{_spinner: { color: 'white' }}}
          onPress={signIn}
        />
        <Text color="white" textAlign="center" mt={4}>
          Não utilizamos nenhuma informação alem {'\n'} 
          do seu e-mail para criação da sua conta
        </Text>
      </Center>
    )
}