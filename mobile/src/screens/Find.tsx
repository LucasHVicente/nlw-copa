import { Heading, useToast, VStack } from "native-base"
import { Header } from "../components/Header"
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find (){
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')
    const toast = useToast()
    const { navigate } = useNavigation() 

    async function handleJoinPool() {
        try {
            if(!code.trim()){
                return toast.show({
                    title: 'Informe um código válido.',
                    bgColor: 'red.500',
                    placement: 'top'
                })
            }

            setIsLoading(true)

            await api.post('/pools/join', { code });
            toast.show({
                title: 'Você entrou no bolão com sucesso.',
                bgColor: 'green.500',
                placement: 'top'
            })
            setIsLoading(false)
            setCode('')
            navigate('pools');
            
        } catch (error) {
            console.log(error)
            let title = 'Não foi possível se juntar ao bolão.'
            if(error.response?.data?.message){
                switch (error.response.data.message) {
                    case 'Pool not found.':
                        title = 'Não foi possível encontrar o bolão.'
                        break

                    case 'You already joined this pool.':
                        title = 'Você já está participando desse bolão.'
                        break
                
                    default:
                        break;
                }
            }
            setIsLoading(false)
            return toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
            
        } 
    }
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por Código" showBackButton/>
            <VStack mt={8} mx={5} alignItems="center">
                <Heading 
                    fontFamily="heading" 
                    color="white" 
                    fontSize="xl" 
                    mb={8} 
                    textAlign="center"
                >
                    Encontrar o bolão através de {'\n'}
                    seu código unico.
                </Heading>
                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    onChangeText={setCode}
                    value={code}
                    autoCapitalize="characters"
                />
                <Button 
                    title="Buscar"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />
            </VStack>
        </VStack>
    )
}