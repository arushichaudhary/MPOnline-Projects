import streamlit as st
from rag_chatbot import RAGChatbot

st.set_page_config(page_title="ABC University Chatbot", page_icon="🎓", layout="centered")

st.markdown("""
<style>
.stApp {
    background-color: #FAF6FF;
}

.main-title {
    font-size: 2.1rem;
    font-weight: 700;
    color: #6B5B95;
    text-align: center;
    margin-bottom: 0.2rem;
}

.subtitle {
    text-align: center;
    color: #9083B0;
    font-size: 0.95rem;
    margin-bottom: 1.8rem;
}

.chat-bubble {
    padding: 0.8rem 1.1rem;
    border-radius: 16px;
    margin-bottom: 0.7rem;
    max-width: 80%;
    line-height: 1.45;
    font-size: 0.95rem;
}

.user-bubble {
    background-color: #FFE3EC;
    color: #6B4F5B;
    margin-left: auto;
    border-bottom-right-radius: 4px;
}

.bot-bubble {
    background-color: #DFF5F0;
    color: #3F5C57;
    margin-right: auto;
    border-bottom-left-radius: 4px;
}

.bubble-row {
    display: flex;
}

.stChatInput textarea, .stChatInput input {
    border-radius: 14px !important;
    border: 1px solid #D9C9F0 !important;
}

div[data-testid="stExpander"] {
    background-color: #F3EFFF;
    border-radius: 12px;
    border: 1px solid #E3D9F7;
}

section[data-testid="stSidebar"] {
    background-color: #F3EEFC;
}
</style>
""", unsafe_allow_html=True)

st.markdown('<div class="main-title">🎓 ABC University Chatbot</div>', unsafe_allow_html=True)
st.markdown('<div class="subtitle">Ask me anything about admissions, hostel, fees or academics</div>', unsafe_allow_html=True)

with st.sidebar:
    st.markdown("### About")
    st.write("This chatbot uses Retrieval-Augmented Generation (RAG) to answer questions from the university knowledge base.")
    st.markdown("### Try asking")
    st.write("- What is the hostel fee?")
    st.write("- When does admission open?")
    st.write("- What courses does CS offer?")

if "bot" not in st.session_state:
    st.session_state.bot = RAGChatbot()

if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.messages:
    bubble_class = "user-bubble" if msg["role"] == "user" else "bot-bubble"
    st.markdown(
        f'<div class="bubble-row"><div class="chat-bubble {bubble_class}">{msg["content"]}</div></div>',
        unsafe_allow_html=True
    )

query = st.chat_input("Ask a question about the university...")

if query:
    st.session_state.messages.append({"role": "user", "content": query})
    st.markdown(
        f'<div class="bubble-row"><div class="chat-bubble user-bubble">{query}</div></div>',
        unsafe_allow_html=True
    )

    answer, chunks = st.session_state.bot.ask(query)

    st.markdown(
        f'<div class="bubble-row"><div class="chat-bubble bot-bubble">{answer}</div></div>',
        unsafe_allow_html=True
    )

    with st.expander("Retrieved chunks"):
        for chunk in chunks:
            st.write(chunk.page_content)
            st.divider()

    st.session_state.messages.append({"role": "assistant", "content": answer})
