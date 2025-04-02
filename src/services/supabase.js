/** 
    Esse código configura a conexão do aplicativo com o Supabase, permitindo a realização de operações no banco de dados, como consultas, inserções, atualizações e deleções.
 **/


// Importa a função createClient da biblioteca '@supabase/supabase-js',
// que é usada para conectar o aplicativo ao banco de dados do Supabase
import { createClient } from '@supabase/supabase-js'

// Define a URL do projeto Supabase
const supabaseUrl = "https://vxtxbzrstnqsxowkjqcu.supabase.co"

// Define a chave anônima do Supabase, usada para autenticação e acesso ao banco de dados
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4dHhienJzdG5xc3hvd2tqcWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTU1NzAsImV4cCI6MjA1NjE3MTU3MH0.gHdNHssRlOXmUJH-Yefl-2h9eYJU34Mx6YkWQ1y9c6Q"

// Cria e exporta uma instância do cliente Supabase, conectando-o com a URL e a chave definidas acima
export const supabase = createClient(supabaseUrl, supabaseAnonKey);