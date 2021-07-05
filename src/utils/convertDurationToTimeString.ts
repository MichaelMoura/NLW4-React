//explicação: as váriaveis que eu estou recebendo entre patenteses são os meus parametros, apos os dois pontos são o valor que eu irei devolver para o meu return
export function convertDurationToTime(duration:number){
   const hours = Math.floor(duration /(60*60));//vai transformar em horas
   const minutes = Math.floor((duration%3600) /60);//vai transformar em minutos
   const seconds = duration % 60;//vai transformar em segundos

   //.map vai percorrer o array
   //e para cada unidade que o meu array percorrer
   /*eu vou transforma-lo em string e adiciona-lo dois caracteres
   meu join vai unir as strings*/
   const timeString = [hours,minutes,seconds]
   .map(unit =>String(unit).padStart(2,'0'))
   .join(':')

   return timeString;
}