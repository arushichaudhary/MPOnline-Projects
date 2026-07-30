import os
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

VECTOR_DB_PATH = "vector_db"

PROMPT_TEMPLATE = """You are an assistant for ABC University.
Use ONLY the supplied context to answer the question.
If the information is not available in the context, say "I don't know."

Context:
{context}

Question:
{question}

Answer:
"""


class RAGChatbot:
    def __init__(self, top_k=3):
        self.top_k = top_k
        self.embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.vector_db = FAISS.load_local(
            VECTOR_DB_PATH,
            self.embedding_model,
            allow_dangerous_deserialization=True
        )
        self.chat_history = []

    def retrieve(self, query):
        results = self.vector_db.similarity_search(query, k=self.top_k)
        return results

    def build_prompt(self, chunks, query):
        context = "\n\n".join(chunk.page_content for chunk in chunks)
        return PROMPT_TEMPLATE.format(context=context, question=query)

    def generate_answer(self, prompt):
        api_key = os.environ.get("GEMINI_API_KEY")

        if not api_key:
            return ("GEMINI_API_KEY not set. Showing retrieved context instead of "
                    "a generated answer:\n\n" + prompt)

        from google import genai
        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text

    def ask(self, query):
        chunks = self.retrieve(query)
        prompt = self.build_prompt(chunks, query)
        answer = self.generate_answer(prompt)

        self.chat_history.append({"question": query, "answer": answer})
        return answer, chunks


if __name__ == "__main__":
    bot = RAGChatbot()
    print("RAG Chatbot ready. Type 'exit' to quit.\n")

    while True:
        query = input("You: ")
        if query.lower() == "exit":
            break

        answer, chunks = bot.ask(query)
        print("\nBot:", answer)
        print("\nRetrieved from:")
        for chunk in chunks:
            print("-", chunk.page_content[:60], "...")
        print()
