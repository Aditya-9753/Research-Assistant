# app/rag/chunking.py

from typing import List


def chunk_text(
    text: str,
    chunk_size: int = 500,
    overlap: int = 50
) -> List[str]:
    """
    Splits text into overlapping chunks for embeddings / RAG
    """
    if chunk_size <= overlap:
        raise ValueError("chunk_size must be greater than overlap")

    words = text.split()
    chunks = []

    start = 0
    total_words = len(words)

    while start < total_words:
        end = start + chunk_size
        chunk = words[start:end]
        chunks.append(" ".join(chunk))
        start += chunk_size - overlap

    return chunks
def reconstruct_text(chunks: List[str]) -> str:
    """         
    Reconstructs original text from overlapping chunks
    """
    if not chunks:
        return ""

    reconstructed = chunks[0].split()
    overlap = len(chunks[0].split()) - len(chunks[1].split())

    for chunk in chunks[1:]:
        words = chunk.split()
        reconstructed.extend(words[overlap:])

    return " ".join(reconstructed)

def calculate_overlap(chunk1: str, chunk2: str) -> int:
    """
    Calculates the number of overlapping words between two chunks
    """
    words1 = chunk1.split()
    words2 = chunk2.split()

    overlap_count = 0
    min_length = min(len(words1), len(words2))

    for i in range(1, min_length + 1):
        if words1[-i] == words2[i - 1]:
            overlap_count += 1
        else:
            break

    return overlap_count
def merge_chunks(chunks: List[str], target_size: int = 500) -> List[str]:
    """
    Merges smaller chunks into larger ones up to target_size
    """
    if not chunks:
        return []

    merged_chunks = []
    current_chunk = []

    for chunk in chunks:
        current_size = sum(len(c.split()) for c in current_chunk)
        chunk_size = len(chunk.split())

        if current_size + chunk_size <= target_size:
            current_chunk.append(chunk)
        else:
            merged_chunks.append(" ".join(current_chunk))
            current_chunk = [chunk]

    if current_chunk:
        merged_chunks.append(" ".join(current_chunk))

    return merged_chunks
def summarize_chunks(chunks: List[str], max_summary_length: int = 100) -> List[str]:
    """
    Creates brief summaries for each chunk
    """
    summaries = []

    for chunk in chunks:
        words = chunk.split()
        summary = " ".join(words[:max_summary_length])
        summaries.append(summary + ("..." if len(words) > max_summary_length else ""))

    return summaries
def filter_redundant_chunks(chunks: List[str], similarity_threshold: float = 0.8) -> List[str]:
    """
    Filters out redundant chunks based on simple word overlap
    """
    filtered_chunks = []

    for chunk in chunks:
        is_redundant = False
        for existing_chunk in filtered_chunks:
            overlap = calculate_overlap(existing_chunk, chunk)
            total_words = min(len(existing_chunk.split()), len(chunk.split()))
            similarity = overlap / total_words if total_words > 0 else 0

            if similarity >= similarity_threshold:
                is_redundant = True
                break

        if not is_redundant:
            filtered_chunks.append(chunk)

    return filtered_chunks
def adjust_chunk_sizes(
    chunks: List[str],
    desired_size: int = 500,
    tolerance: int = 50
) -> List[str]:
    """
    Adjusts chunk sizes to be within desired_size ± tolerance
    """
    adjusted_chunks = []

    for chunk in chunks:
        words = chunk.split()
        if len(words) < desired_size - tolerance:
            adjusted_chunks.append(chunk)
        elif len(words) > desired_size + tolerance:
            sub_chunks = chunk_text(chunk, chunk_size=desired_size, overlap=tolerance)
            adjusted_chunks.extend(sub_chunks)
        else:
            adjusted_chunks.append(chunk)

    return adjusted_chunks 
    return adjusted_chunks
    return adjusted_chunks