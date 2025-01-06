def get_expected_outcome(filename: str) -> int:
    """
    Maps video filenames to their expected dice outcomes.
    
    Args:
        filename: Name of the video file
    
    Returns:
        Expected dice outcome (1-6)
    """
    prefix = filename[:2].upper()
    mapping = {
        'FE': 5,  # Five
        'FY': 4,  # Four
        'S': 6,   # Six
        'T': 3,   # Three
        'TO': 2,  # Two
        'O': 1    # One
    }
    
    return mapping.get(prefix) 