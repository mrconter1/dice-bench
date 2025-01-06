def get_expected_outcome(filename: str) -> int:
    """
    Maps video filenames to their expected dice outcomes.
    
    Args:
        filename: Name of the video file
    
    Returns:
        Expected dice outcome (1-6)
    """
    filename = filename.upper()
    
    if filename.startswith('FE'):
        return 5  # Five
    elif filename.startswith('FY'):
        return 4  # Four
    elif filename.startswith('S'):
        return 6  # Six
    elif filename.startswith('TV'):
        return 2  # Two
    elif filename.startswith('T'):
        return 3  # Three
    elif filename.startswith('E'):
        return 1  # One
    
    return None 