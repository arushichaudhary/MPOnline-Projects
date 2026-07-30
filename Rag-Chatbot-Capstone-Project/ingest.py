from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

DATA_PATH = "data/university.txt"
VECTOR_DB_PATH = "vector_db"

loader = TextLoader(DATA_PATH)
documents = loader.load()
print(f"Loaded {len(documents)} document(s)")

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = text_splitter.split_documents(documents)
print(f"Split into {len(chunks)} chunks")

for i, chunk in enumerate(chunks):
    print(f"\nChunk {i+1}:")
    print(chunk.page_content)

embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

vector_db = FAISS.from_documents(chunks, embedding_model)
vector_db.save_local(VECTOR_DB_PATH)
print(f"\nVector database saved to {VECTOR_DB_PATH}")
